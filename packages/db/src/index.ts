import * as schema from './schema';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });



export * from "./types";


export type Database = typeof db;

export { eq, gt, gte, ne } from "drizzle-orm";

export * from "./schema";
export { default as superjson } from "superjson";
