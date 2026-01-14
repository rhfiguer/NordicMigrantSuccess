import express from "express";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, text, serial, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import ws from "ws";
import { createClient } from '@supabase/supabase-js';

// ===================== CONFIG =====================
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Supabase Admin client (needs service role key for user creation)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// ===================== SCHEMA =====================
const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    fullName: text("full_name"),
    gumroadLicenseKey: text("gumroad_license_key").unique(),
    subscriptionStatus: text("subscription_status").notNull().default("inactive"),
    tier: text("tier").notNull().default("citizen"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastLogin: timestamp("last_login"),
});

const faqs = pgTable("faqs", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    order: integer("order").notNull().default(0),
});

const quizQuestions = pgTable("quiz_questions", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    category: text("category").notNull(),
    order: integer("order").notNull().default(0),
});

const testimonials = pgTable("testimonials", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    countryOrigin: text("country_origin").notNull(),
    city: text("city").notNull(),
    testimonial: text("testimonial").notNull(),
    imageUrl: text("image_url"),
});

const db = drizzle({
    client: pool,
    schema: { profiles, faqs, quizQuestions, testimonials }
});

// ===================== EXPRESS APP =====================
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
});

// ===================== BASIC ROUTES =====================

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/faqs", async (req, res) => {
    try {
        const result = await db.select().from(faqs).orderBy(faqs.order);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching FAQs:", error);
        res.status(500).json({ message: "Error al obtener FAQs" });
    }
});

app.get("/api/quiz-questions", async (req, res) => {
    try {
        const result = await db.select().from(quizQuestions).orderBy(quizQuestions.order);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching quiz questions:", error);
        res.status(500).json({ message: "Error al obtener preguntas" });
    }
});

app.get("/api/testimonials", async (req, res) => {
    try {
        const result = await db.select().from(testimonials);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching testimonials:", error);
        res.status(500).json({ message: "Error al obtener testimonios" });
    }
});

app.get("/api/profile", async (req, res) => {
    try {
        const email = req.query.email as string;
        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }
        const result = await db.select().from(profiles).where(eq(profiles.email, email));
        res.json(result[0] || null);
    } catch (error: any) {
        console.error("[API] Error fetching profile:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// ===================== UNIFIED ACTIVATION (NO MAGIC LINK) =====================
app.post("/api/activate", async (req, res) => {
    const GUMROAD_PRODUCT_ID = "XN2DDaLOWhon9S7B38sIrw==";

    try {
        console.log("🚀 [ACTIVATE] Starting activation...");
        const { email, licenseKey } = req.body;

        // Step 1: Validate inputs
        if (!email || !licenseKey) {
            return res.status(400).json({
                success: false,
                error: "MISSING_FIELDS",
                message: "Email y license key son requeridos"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        console.log(`📧 [ACTIVATE] Email: ${normalizedEmail}`);

        // Step 2: Validate license with Gumroad FIRST
        console.log("🌍 [ACTIVATE] Validating with Gumroad...");
        const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: GUMROAD_PRODUCT_ID,
                license_key: licenseKey.trim(),
            }),
        });

        const gumroadData = await gumroadResponse.json();
        console.log("📬 [ACTIVATE] Gumroad response success:", gumroadData.success);

        if (!gumroadData.success) {
            return res.status(400).json({
                success: false,
                error: "INVALID_LICENSE",
                message: "Esta licencia no es válida"
            });
        }

        if (gumroadData.purchase?.refunded || gumroadData.purchase?.chargebacked) {
            return res.status(400).json({
                success: false,
                error: "LICENSE_REVOKED",
                message: "Esta licencia fue reembolsada"
            });
        }

        console.log("✅ [ACTIVATE] License valid!");

        // Step 3: Create or get Supabase Auth user
        console.log("👤 [ACTIVATE] Setting up Supabase user...");

        // Check if user exists
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        let authUser = existingUsers?.users?.find(u => u.email === normalizedEmail);

        if (!authUser) {
            // Create new user with a random password (they'll use magic link to login)
            console.log("✨ [ACTIVATE] Creating new Supabase user...");
            const tempPassword = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

            const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                email: normalizedEmail,
                password: tempPassword,
                email_confirm: true, // Auto-confirm since license validates identity
                user_metadata: {
                    full_name: gumroadData.purchase?.full_name || normalizedEmail.split('@')[0],
                    license_key: licenseKey.trim()
                }
            });

            if (createError) {
                console.error("❌ [ACTIVATE] Failed to create user:", createError);
                return res.status(500).json({
                    success: false,
                    error: "USER_CREATION_FAILED",
                    message: "Error al crear usuario"
                });
            }

            authUser = newUser.user;
        }

        console.log("👤 [ACTIVATE] Auth user ready:", authUser?.id);

        // Step 4: Create/update profile in database
        console.log("💾 [ACTIVATE] Updating profile...");
        const existingProfile = await db.select().from(profiles).where(eq(profiles.email, normalizedEmail));

        let profile;
        if (existingProfile.length > 0) {
            const updated = await db.update(profiles)
                .set({
                    gumroadLicenseKey: licenseKey.trim(),
                    subscriptionStatus: 'active',
                    lastLogin: new Date()
                })
                .where(eq(profiles.email, normalizedEmail))
                .returning();
            profile = updated[0];
        } else {
            const inserted = await db.insert(profiles)
                .values({
                    email: normalizedEmail,
                    fullName: gumroadData.purchase?.full_name || normalizedEmail.split('@')[0],
                    gumroadLicenseKey: licenseKey.trim(),
                    subscriptionStatus: 'active',
                    tier: 'citizen',
                    lastLogin: new Date()
                })
                .returning();
            profile = inserted[0];
        }

        console.log("✅ [ACTIVATE] Profile ready:", profile?.id);

        // Step 5: Generate session for immediate login
        console.log("🔐 [ACTIVATE] Generating session...");
        const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'magiclink',
            email: normalizedEmail,
            options: {
                redirectTo: `${req.headers.origin || 'https://somosmaas.org'}/dashboard`
            }
        });

        if (sessionError) {
            console.error("⚠️ [ACTIVATE] Session generation failed:", sessionError);
            // Still success - user can login manually
            return res.status(200).json({
                success: true,
                message: "¡Cuenta activada! Ahora puedes iniciar sesión.",
                profile,
                redirectTo: "/login"
            });
        }

        console.log("🎉 [ACTIVATE] Complete! Returning magic link for immediate login.");

        return res.status(200).json({
            success: true,
            message: "¡Membresía activada!",
            profile,
            // Return the magic link URL for the frontend to redirect
            loginUrl: sessionData?.properties?.action_link,
            redirectTo: "/dashboard"
        });

    } catch (error: any) {
        console.error("🔥 [ACTIVATE] Error:", error.message);
        console.error(error);
        res.status(500).json({
            success: false,
            error: "SERVER_ERROR",
            message: "Error interno del servidor"
        });
    }
});

export default app;
