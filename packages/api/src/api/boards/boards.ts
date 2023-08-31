import { config } from "dotenv"
import * as z from "zod"
import { Board, Workspace } from "@shared/db";
import { eq } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../../trpc";


export const boardsRouter = router({
    getSiblingBoards: publicProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;


        return db.transaction(async (trx) => {
            const board = await trx.query.Board.findFirst({
                where(fields, { eq }) {
                    return eq(fields.id, input.id)
                },
                columns: {
                    accentColor: true,
                    workspaceId: true,
                }
            })
            if (!board) throw new Error("Board not found")
            if (!board.workspaceId) throw new Error("Board not found")

            const otherBoardsFromWorkspace = await trx.select({
                boards: {
                    id: Board.id,
                    name: Board.name,
                }
            }).from(Board).where(eq(Board.workspaceId, board.workspaceId))
            return {
                accentColor: board.accentColor,
                workspace: {
                    boards: otherBoardsFromWorkspace.map(w => w.boards)
                }
            }
        })

    }),
    getAll: protectedProcedure.query(({ ctx }) => {
        const { db } = ctx;
        const userId = ctx.user?.id
        console.log(userId)
        return db.query.Board.findMany({
            where(fields, { eq }) {
                return eq(fields.userId, userId)
            },
        })
    }),
    setDraft: publicProcedure.input(z.object({
        id: z.string(),
        draft: z.any(),
        name: z.string(),
        background: z.string(),
        accentColor: z.string(),

    })).mutation(({ input, ctx }) => {
        const { db } = ctx;


        return db.update(Board).set({
            draft: input.draft,
            name: input.name,
            background: input.background,
            accentColor: input.accentColor,
        }).where(eq(Board.id, input.id)).returning({
            content: Board.draft,
        })
    }),

    publish: protectedProcedure.input(z.object({
        id: z.string(),
        currentContent: z.any()
    })).mutation(async ({ input, ctx }) => {
        const { db } = ctx;

        return db.update(Board).set({
            published: true,
            content: input.currentContent

        }).where(eq(Board.id, input.id)).returning({
            content: Board.draft,
        })
    }),

    get: protectedProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;

        return db.query.Board.findFirst({
            where: eq(Board.id, input.id)
        })
    }),
    create: protectedProcedure.input(z.object({
        name: z.string(),
        workspaceId: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const { db } = ctx;
        const userId = ctx.user?.id
        if (!userId) throw new Error("User not found")
        /*        return db.insert(Board).values({
                   name: input.name,
                   workspaceId: input.workspaceId,
                   userId: userId,
               }).returning({
                   id: Board.id,
                   name: Board.name,
                   workspaceId: Board.workspaceId,
                   userId: Board.userId,
               }) */
    }
    ),

})
