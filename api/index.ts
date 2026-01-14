import express from "express";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import ws from "ws";
import { createClient } from '@supabase/supabase-js';

// ===================== CONFIG =====================
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Supabase Admin client for server-side user management
const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

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

// Logging
app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
});

// ===================== ROUTES =====================

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get FAQs
app.get("/api/faqs", async (req, res) => {
    try {
        const result = await db.select().from(faqs).orderBy(faqs.order);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching FAQs:", error);
        res.status(500).json({ message: "Error al obtener FAQs" });
    }
});

// Get Quiz Questions
app.get("/api/quiz-questions", async (req, res) => {
    try {
        const result = await db.select().from(quizQuestions).orderBy(quizQuestions.order);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching quiz questions:", error);
        res.status(500).json({ message: "Error al obtener preguntas" });
    }
});

// Get Testimonials
app.get("/api/testimonials", async (req, res) => {
    try {
        const result = await db.select().from(testimonials);
        res.json(result);
    } catch (error: any) {
        console.error("[API] Error fetching testimonials:", error);
        res.status(500).json({ message: "Error al obtener testimonios" });
    }
});

// Get Profile
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

// ===================== UNIFIED ACTIVATION =====================
// This is the SINGLE endpoint for all activation logic
app.post("/api/activate", async (req, res) => {
    const GUMROAD_PRODUCT_ID = "XN2DDaLOWhon9S7B38sIrw==";

    try {
        console.log("🚀 [ACTIVATE] Starting unified activation...");
        const { email, licenseKey } = req.body;

        // Step 1: Validate inputs
        if (!email || !licenseKey) {
            console.warn("⚠️ [ACTIVATE] Missing email or licenseKey");
            return res.status(400).json({
                success: false,
                error: "MISSING_FIELDS",
                message: "Email y license key son requeridos"
            });
        }

        console.log(`📧 [ACTIVATE] Email: ${email}`);
        console.log(`🔑 [ACTIVATE] License: ${licenseKey.substring(0, 8)}...`);

        // Step 2: Validate license with Gumroad FIRST
        console.log("🌍 [ACTIVATE] Validating with Gumroad...");
        const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: GUMROAD_PRODUCT_ID,
                license_key: licenseKey,
            }),
        });

        const gumroadData = await gumroadResponse.json();
        console.log("📬 [ACTIVATE] Gumroad response:", JSON.stringify(gumroadData, null, 2));

        if (!gumroadData.success) {
            console.warn("❌ [ACTIVATE] Invalid license");
            return res.status(400).json({
                success: false,
                error: "INVALID_LICENSE",
                message: "Esta licencia no es válida"
            });
        }

        if (gumroadData.purchase?.refunded || gumroadData.purchase?.chargebacked) {
            console.warn("❌ [ACTIVATE] License refunded/chargebacked");
            return res.status(400).json({
                success: false,
                error: "LICENSE_REVOKED",
                message: "Esta licencia fue reembolsada"
            });
        }

        if (gumroadData.purchase?.subscription_cancelled_at) {
            console.warn("❌ [ACTIVATE] Subscription cancelled");
            return res.status(400).json({
                success: false,
                error: "SUBSCRIPTION_CANCELLED",
                message: "La suscripción fue cancelada"
            });
        }

        console.log("✅ [ACTIVATE] License is valid!");

        // Step 3: Check if profile already exists
        console.log("💾 [ACTIVATE] Checking database...");
        const existingProfile = await db.select().from(profiles).where(eq(profiles.email, email));

        let profile;
        let isNewUser = false;

        if (existingProfile.length > 0) {
            // Update existing profile
            console.log("🔄 [ACTIVATE] Updating existing profile...");
            const updated = await db.update(profiles)
                .set({
                    gumroadLicenseKey: licenseKey,
                    subscriptionStatus: 'active',
                    lastLogin: new Date()
                })
                .where(eq(profiles.email, email))
                .returning();
            profile = updated[0];
        } else {
            // Create new profile
            console.log("✨ [ACTIVATE] Creating new profile...");
            isNewUser = true;
            const inserted = await db.insert(profiles)
                .values({
                    email,
                    fullName: gumroadData.purchase?.full_name || email.split('@')[0],
                    gumroadLicenseKey: licenseKey,
                    subscriptionStatus: 'active',
                    tier: 'citizen',
                    lastLogin: new Date()
                })
                .returning();
            profile = inserted[0];
        }

        console.log("🎉 [ACTIVATE] Profile ready:", profile?.id);

        // Step 4: Send magic link for new users
        if (isNewUser) {
            console.log("📧 [ACTIVATE] Sending magic link to new user...");
            const { error: authError } = await supabaseAdmin.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${req.headers.origin || 'https://somosmaas.org'}/dashboard`,
                },
            });

            if (authError) {
                console.error("⚠️ [ACTIVATE] Magic link error:", authError);
                // Don't fail - profile was created, user can try login later
            }

            return res.status(200).json({
                success: true,
                action: "created",
                needsEmailVerification: true,
                message: "¡Cuenta creada! Revisa tu email para acceder.",
                profile
            });
        }

        // For existing users, they just need to login
        return res.status(200).json({
            success: true,
            action: "activated",
            needsEmailVerification: false,
            message: "¡Licencia activada! Inicia sesión para acceder.",
            profile
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

// Legacy endpoint (redirect to new one)
app.post("/api/verify-license", async (req, res) => {
    console.log("⚠️ [LEGACY] /api/verify-license called, redirecting to /api/activate");

    // Transform request to match new format
    const { licenseKey, email, userId, fullName } = req.body;

    // Call the new activate logic
    req.body = { email, licenseKey };

    // Forward to activate endpoint
    const response = await fetch(`${req.headers.origin || 'https://somosmaas.org'}/api/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, licenseKey }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
});

export default app;
