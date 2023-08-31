import { config } from "dotenv"
import * as z from "zod"
import { router, publicProcedure } from '../../trpc'
import { db } from "../../index"

config()
export const helloRouter = router({
    world: publicProcedure
        .input(z.string())
        .query(({ input }) => {
            return `Hello ${input ?? 'Sam'}!`
        }),
})

