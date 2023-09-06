import { relations } from "drizzle-orm";
import { boolean, index, integer, json, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";



export const proposal = pgTable("Proposal", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	coverImage: text("coverImage"),
	content: text("content").notNull(),
	budgetTotal: integer("budgetTotal").notNull(),
	projectId: integer("projectId"),
	revised: boolean("revised").default(true).notNull(),



});

export const category = pgTable("Category", {
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	name: text("name").primaryKey().notNull(),
},
	(table) => {
		return {
			nameKey: uniqueIndex("Category_name_key").on(table.name),
		}
	});

export const project = pgTable("Project", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),

});

export const roadmapSection = pgTable("RoadmapSection", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	proposalId: integer("proposalId").notNull().references(() => proposal.id, { onDelete: "cascade", onUpdate: "cascade" })

});

export const socialHandle = pgTable("SocialHandle", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	teamMemberName: text("teamMemberName").notNull()
});

export const teamMember = pgTable("TeamMember", {
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	name: text("name").primaryKey().notNull(),
	what: text("what").default('').notNull(),
	walletAddress: text("walletAddress").default('').notNull(),
	socialHandles: json("socialHandles").default('[]').notNull(),

},
	(table) => {
		return {
			nameKey: uniqueIndex("TeamMember_name_key").on(table.name),
		}
	});

export const budgetSection = pgTable("BudgetSection", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	amount: integer("amount").notNull(),
	proposalId: integer("proposalId").notNull().references(() => proposal.id, { onDelete: "cascade", onUpdate: "cascade" })
});



export const categoryToProposal = pgTable("category_to_proposal", {
	categoryName: text("category_name").notNull().references(() => category.name, { onDelete: "cascade", onUpdate: "cascade" }),
	proposalId: integer("proposal_id").notNull().references(() => proposal.id, { onDelete: "cascade", onUpdate: "cascade" })
},
	(t) => {
		return {
			pk: primaryKey(t.categoryName, t.proposalId),
		}
	});

export const proposalToTeamMember = pgTable("proposal_to_team_member", {
	proposalId: integer("propposal_id").notNull().references(() => proposal.id, { onDelete: "cascade", onUpdate: "cascade" }),
	teamMemberName: text("team_member_id").notNull().references(() => teamMember.name, { onDelete: "cascade", onUpdate: "cascade" }),
},
	(t) => {
		return {
			pk: primaryKey(t.proposalId, t.teamMemberName),
		}
	});

