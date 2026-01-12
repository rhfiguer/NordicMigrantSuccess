import "dotenv/config";
import { db } from "./db";
import { sql } from "drizzle-orm";

async function checkTables() {
    console.log("Checking database connection and tables...");
    try {
        const result = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        console.log("Tables found in database:");
        const tables = result.rows.map(row => row.table_name);
        console.log(tables);

        const requiredTables = ['profiles', 'leads', 'clients'];
        const missing = requiredTables.filter(t => !tables.includes(t));

        if (missing.length > 0) {
            console.error("❌ MISSING TABLES:", missing);
        } else {
            console.log("✅ All required tables exist!");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    }
}

checkTables();
