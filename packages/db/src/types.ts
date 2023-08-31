import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { User, Board, Workspace } from "./schema";

export type SelectUser = InferSelectModel<typeof User>;
export type InsertUser = InferInsertModel<typeof User>;

export type SelectBoard = InferSelectModel<typeof Board>;
export type InsertBoard = InferInsertModel<typeof Board>;

export type SelectWorkspace = InferSelectModel<typeof Workspace>;
export type InsertWorkspace = InferInsertModel<typeof Workspace>;