import * as z from "zod";
import { publicProcedure, router } from "../../trpc";
import { mapReducer } from "../../utils/reducer";
import * as categories from "./categories";
import { getNounOfTheDay } from "./noun-of-day";
import { getProposalContent } from "./proposal-content";
import { getProposalRoadmap } from "./proposal-roadmap";
import { getProposalVotes } from "./proposal-votes";
import { getBudgetSections } from "./proposals-budget";
import { getProposalMeta, input as getProposalMetaInput } from "./proposals-meta";
import { getProposalTeamMembers } from "./team-members";


export const dataSourceRouter = router({
    votes: publicProcedure.input(z.object({
        proposalId: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;
    }),

    proposalsMeta: publicProcedure.input(getProposalMetaInput).query(async ({ input, ctx }) => {


        return getProposalMeta(input)
    }),

    categories: publicProcedure.query(async ({ ctx }) => {

        const categoriesEdges = await categories.fecthAllCategories()
        const CategoriesMap: Record<string, { name: string, totalBudget: number }> = {}


        const cleaned = mapReducer(CategoriesMap, (acc, curr) => {
            const categoryName = curr?.node.category_name
            if (!categoryName) return acc

            if (!acc[categoryName]) {
                acc[categoryName] = {
                    name: categoryName,
                    totalBudget: 0
                }
            }

            acc[categoryName].totalBudget += curr.node.proposal.budgetTotal

            return acc



        }, categoriesEdges)

        return Object.values(cleaned)

    }),

    getProposalBudget: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
        return getBudgetSections(input)
    }),

    getProposalTeamMembers: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {

        return getProposalTeamMembers(input)
    }),
    getProposalContent: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {

        return getProposalContent(input)
    }),
    getProposalVotes: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
        return getProposalVotes(input)
    }),

    getNounOfTheDay: publicProcedure.query(async ({ ctx }) => {
        return getNounOfTheDay()
    }),

    getProposalRoadmap: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
        return getProposalRoadmap(input)
    }),

})


export type DataSourceRouter = typeof dataSourceRouter;