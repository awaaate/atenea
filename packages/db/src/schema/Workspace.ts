import { boolean, index, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { User } from "./User";



export const Workspace = pgTable("Workspace", {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    description: text("description"),
    logo: text("logo").default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png'),
    font: text("font").default('font-cal').notNull(),
    image: text("image").default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'),
    imageBlurhash: text("imageBlurhash").default('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC'),
    subdomain: text("subdomain"),
    customDomain: text("customDomain"),
    message404: text("message404").default("Blimey! You''ve found a page that doesn''t exist"),
    createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
    userId: text("userId").references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    accentColor: text("accentColor").default('default').notNull(),
    isPublic: boolean("isPublic").default(false).notNull(),
},
    (table) => {
        return {
            subdomainKey: uniqueIndex("Site_subdomain_key").on(table.subdomain),
            customDomainKey: uniqueIndex("Site_customDomain_key").on(table.customDomain),
            userIdIdx: index("Workspace_userId_idx").on(table.userId),
        }
    });
