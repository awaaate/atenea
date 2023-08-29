import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../env';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'



const client = postgres(process.env.DATABASE_URL || "postgres://postgres:-kZMm22kC7_yXt*@db.qefwetfuanuvdqtubjpw.supabase.co:6543/postgres")

export const db = drizzle(client, { schema });

export type SelectTeamMember = InferSelectModel<typeof schema.teamMember>;
export type InsertTeamMember = InferInsertModel<typeof schema.teamMember>;

export type SelectProposal = InferSelectModel<typeof schema.proposal>;
export type InsertProposal = InferInsertModel<typeof schema.proposal>;

export type SelectCategory = InferSelectModel<typeof schema.category>;
export type InsertCategory = InferInsertModel<typeof schema.category>;

export type SelectProject = InferSelectModel<typeof schema.project>;
export type InsertProject = InferInsertModel<typeof schema.project>;

export type SelectRoadmapSection = InferSelectModel<typeof schema.roadmapSection>;
export type InsertRoadmapSection = InferInsertModel<typeof schema.roadmapSection>;

export type SelectSocialHandle = InferSelectModel<typeof schema.socialHandle>;
export type InsertSocialHandle = InferInsertModel<typeof schema.socialHandle>;
