import { eq } from "@shared/db/src/orm";
import { Board } from "@shared/db/src/schema";
import { nanoid } from "nanoid";
import * as z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";


export const boardsRouter = router({
    getSiblingBoards: publicProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;

        const workspace = await db.query.Board.findFirst({
            where: eq(Board.id, input.id),
            columns: {
                workspaceId: true,
            }
        })
        if (!workspace) throw new Error("Board not found")
        const workspaceId = workspace.workspaceId
        if (!workspaceId) throw new Error("Workspace not found")

        const boards = await db.query.Board.findMany({
            where: eq(Board.workspaceId, workspaceId),
            columns: {
                id: true,
                name: true,
            }
        })

        return {
            workspaceId,
            boards
        }
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
            draft: Board.draft,
            name: Board.name,
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

    get: publicProcedure.input(z.object({
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
        const board = {
            id: nanoid(),
            name: input.name,
            workspaceId: input.workspaceId,
            userId: userId,
            createdAt: new Date().toISOString(), // convert Date to string
            updatedAt: new Date().toISOString(), // convert Date to string
        };
        return db.insert(Board).values(board).returning({
            id: Board.id,
            name: Board.name,
        })
    })


})
