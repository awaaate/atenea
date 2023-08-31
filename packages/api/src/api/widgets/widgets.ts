import * as z from "zod";
import { publicProcedure, router } from "../../trpc";


export const widgetsRouter = router({
    votes: publicProcedure.input(z.object({
        proposalId: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;
    }),
})
