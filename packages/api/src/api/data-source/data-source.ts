import * as z from "zod";
import { publicProcedure, router } from "../../trpc";
import * as proposalsMeta from "./proposals-meta"
import { nounsSubgraph } from "../../lib/nounsSubgraph";
import { ProposalMeta } from "./proposals-meta/types";

export const dataSourceRouter = router({
    votes: publicProcedure.input(z.object({
        proposalId: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;
    }),

    proposalsMeta: publicProcedure.input(proposalsMeta.input).query(async ({ input, ctx }) => {

        const { proposer, status, descriptionContains, titleContains, ...params } = input;
        const data = await nounsSubgraph.request<{ proposals: ProposalMeta[] }>(proposalsMeta.query, {
            ...params,
            where: {
                proposer,
                status,
                description_contains_nocase: descriptionContains,
                title_contains_nocase: titleContains,
            },
        })

        return data.proposals
    })
})


export type DataSourceRouter = typeof dataSourceRouter;