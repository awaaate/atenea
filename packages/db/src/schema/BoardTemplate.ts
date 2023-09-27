import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Board } from "./Board";

export const BoardTemplate = pgTable("board_template", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", {
    precision: 3,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  image: text("coverImage").default(
    "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png"
  ),

  boardId: text("boardId").references(() => Board.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});
