import { InsertProject, InsertProposal, db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { formSchema } from "@/components/forms/form-schema";
import { proposal, teamMember, proposalToTeamMember, category, categoryToProposal, budgetSection, roadmapSection, project } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getUniqueProposal } from "./getUniqueProposal";
import { updateProposal } from "./updateProposal";


export const appRouter = router({
    // We can add more routes here
    getTeamMembers: publicProcedure.query(() => {
        return db.query.teamMember.findMany({

        })
    }),

    getBudgetSections: publicProcedure.input(z.object({
        proposalId: z.number()
    })).query(async ({ input }) => {
        return db.query.budgetSection.findMany({
            where({ proposalId }, { eq }) {
                return eq(proposalId, input.proposalId)
            }
        })

    }),

    deleteBudgetSection: publicProcedure.input(z.object({
        id: z.number()
    })).mutation(async ({ input }) => {
        return await db.delete(budgetSection).where(eq(budgetSection.id, input.id)).returning({
            id: budgetSection.id
        })
    }),




    getCategories: publicProcedure.query(() => {
        return db.query.category.findMany()
    }),
    getProjects: publicProcedure.query(() => {
        return db.query.project.findMany()
    }),

    updateProposal: publicProcedure.input(formSchema).mutation(async ({ input }) => {

        try {
            await updateProposal(input)

            return
        } catch (error) {
            console.log(error)
            throw error

        }

    }),

    getUniqueProposal: publicProcedure.input(z.object({
        proposalId: z.number()
    })).query(async ({ input }) => {
        return getUniqueProposal(input.proposalId)
    }),


})

export type AppRouter = typeof appRouter;