
import { boolean, index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { User } from "./User";
import { Workspace } from "./Workspace";

export const Board = pgTable("Board", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
    coverImage: text("coverImage").default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'),
    coverImageBlurHash: text("coverImageBlurHash").default('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC'),
    content: jsonb("content"),
    workspaceId: text("workspaceId").references(() => Workspace.id, { onDelete: "set null", onUpdate: "cascade" }),
    userId: text("userId").references(() => User.id, { onDelete: "set null", onUpdate: "cascade" }),
    draft: jsonb("draft"),
    published: boolean("published").default(false).notNull(),
    isPublic: boolean("isPublic").default(false).notNull(),
    showTopbar: boolean("showTopbar").default(true).notNull(),
    background: text("background").default('transparent').notNull(),
    accentColor: text("accentColor").default('default').notNull(),
    coverImageEnabled: boolean("coverImageEnabled").default(false).notNull(),

},
    (table) => {
        return {
            userIdIdx: index("Board_userId_idx").on(table.userId),
        }
    });
