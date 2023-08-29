import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, primaryKey, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";



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
	proposalId: integer("proposalId").notNull()
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
	proposalId: integer("proposalId").notNull(),
});



export const categoryToProposal = pgTable("category_to_proposal", {
	categoryName: text("category_name").notNull(),
	proposalId: integer("proposal_id").notNull(),
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

export const proposalsRelations = relations(proposal, ({ many, one }) => ({
	proposalToTeamMembers: many(proposalToTeamMember),
	categoryToProposals: many(categoryToProposal),

	project: one(project, {
		fields: [proposal.projectId],
		references: [project.id],
	}),

	roadmapSections: many(roadmapSection),
	budgetSections: many(budgetSection),

}))

export const teamMemberRelations = relations(teamMember, ({ many, }) => ({
	proposalToTeamMembers: many(proposalToTeamMember),
	socialHandles: many(socialHandle),
}))

export const categoryRelations = relations(category, ({ many, }) => ({
	categoryToProposals: many(categoryToProposal),
}))


export const projectRelations = relations(project, ({ many, }) => ({
	proposals: many(proposal),
}))

export const roadmapSectionRelations = relations(roadmapSection, ({ many, one }) => ({
	proposal: one(proposal, {
		fields: [roadmapSection.proposalId],
		references: [proposal.id],
	}),
}))

export const budgetSectionRelations = relations(budgetSection, ({ many, one }) => ({
	proposal: one(proposal, {
		fields: [budgetSection.proposalId],
		references: [proposal.id],
	}),
}))

export const socialHandleRelations = relations(socialHandle, ({ many, one }) => ({
	teamMember: one(teamMember, {
		fields: [socialHandle.teamMemberName],
		references: [teamMember.name],
	}),
}))
