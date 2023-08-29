import "dotenv/config";
import type { Config } from "drizzle-kit";


export default {
    schema: "./db/schema.ts",
    out: "./db",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || "",
    }
} satisfies Config;