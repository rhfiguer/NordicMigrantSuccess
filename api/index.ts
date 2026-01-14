import express from "express";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import ws from "ws";

// ===================== DATABASE SETUP =====================
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ===================== SCHEMA DEFINITIONS =====================
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

// Create DB instance with schema
const db = drizzle({
    client: pool,
    schema: { profiles, faqs, quizQuestions, testimonials }
});

// ===================== EXPRESS APP =====================
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.path}`);
    next();
});

// ===================== API ROUTES =====================

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

// Get Profile by Email
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

// ===================== LICENSE VERIFICATION =====================
app.post("/api/verify-license", async (req, res) => {
    try {
        console.log("🔍 [API] Starting Verification Process...");
        const { licenseKey, email, userId, fullName } = req.body;
        const GUMROAD_PRODUCT_ID = "XN2DDaLOWhon9S7B38sIrw==";

        console.log(`🔍 [API] User ID: ${userId || 'N/A'} | Email: ${email || 'N/A'}`);

        if (!userId || !email || !licenseKey) {
            console.warn("⚠️ [API] Missing critical fields.");
            return res.status(400).json({
                success: false,
                message: "Datos incompletos. Se requiere inicio de sesión."
            });
        }

        // Verify with Gumroad
        console.log("🌍 [API] Calling Gumroad API...");
        const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: GUMROAD_PRODUCT_ID,
                license_key: licenseKey,
            }),
        });

        const gumroadData = await gumroadResponse.json();
        console.log("📬 [API] Gumroad Response:", JSON.stringify(gumroadData, null, 2));

        if (!gumroadData.success || gumroadData.purchase?.refunded || gumroadData.purchase?.chargebacked) {
            console.warn("❌ [API] License invalid/refunded");
            return res.status(400).json({
                success: false,
                message: "Licencia inválida o expirada."
            });
        }

        const isSubscriptionActive = !gumroadData.purchase?.subscription_cancelled_at;
        if (!isSubscriptionActive) {
            console.warn("❌ [API] Subscription cancelled");
            return res.status(400).json({
                success: false,
                message: "Suscripción cancelada."
            });
        }

        console.log(`✅ [API] Gumroad valid. Email: ${gumroadData.purchase?.email}`);

        // UPSERT Profile
        console.log("💾 [API] Checking/Creating profile...");

        const existingProfile = await db.select().from(profiles).where(eq(profiles.email, email));

        let profile;
        if (existingProfile.length > 0) {
            // UPDATE
            console.log(`🔄 [API] Updating existing profile: ${existingProfile[0].id}`);
            const updated = await db.update(profiles)
                .set({
                    gumroadLicenseKey: licenseKey,
                    subscriptionStatus: 'active',
                    lastLogin: new Date()
                })
                .where(eq(profiles.id, existingProfile[0].id))
                .returning();
            profile = updated[0];
        } else {
            // INSERT
            console.log(`✨ [API] Creating new profile for: ${email}`);
            const inserted = await db.insert(profiles)
                .values({
                    email,
                    fullName: fullName || gumroadData.purchase?.email,
                    gumroadLicenseKey: licenseKey,
                    subscriptionStatus: 'active',
                    tier: 'citizen',
                    lastLogin: new Date()
                })
                .returning();
            profile = inserted[0];
        }

        console.log("🚀 [API] Activation successful! Profile ID:", profile?.id);
        res.status(200).json({
            success: true,
            message: "¡Activación completada!",
            profile
        });

    } catch (error: any) {
        console.error("🔥 [API ERROR]:", error.message);
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor.",
            error: error.message
        });
    }
});

// Export for Vercel
export default app;
