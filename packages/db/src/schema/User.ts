import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";



export const User = pgTable("User", {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    username: text("username"),
    walletAddress: text("walletAddress").notNull(),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
    image: text("image"),
    createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
    (table) => {
        return {
            emailKey: uniqueIndex("User_email_key").on(table.email),
            walletAddressKey: uniqueIndex("User_walletAddress_key").on(table.walletAddress),
        }
    });
