import { Board, Workspace } from "@shared/db";
import { eq } from "drizzle-orm";
import { nanoid } from 'nanoid';
import * as z from "zod";
import { protectedProcedure, router } from '../../trpc';
export const workspaceRouter = router({

    getAll: protectedProcedure.query(({ ctx }) => {
        const { db } = ctx;
        const userId = ctx.user?.id
        console.log(userId)
        return db.query.Workspace.findMany({
            where(fields, { eq }) {
                return eq(fields.userId, userId)
            },
        })
    }),

    getUserWorkspaces: protectedProcedure.query(async ({ input, ctx }) => {
        const { db, user } = ctx;
        const workspaces = await db.query.Workspace.findMany({
            where(fields, { eq }) {
                return eq(fields.userId, user.id);
            },
            columns: {
                id: true,
                name: true,
            },
        });
        return workspaces;
    }),

    getWorkspaceBoards: protectedProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;


        const rows = await db.select({
            boards: {
                id: Board.id,
                name: Board.name,
            },
            name: Workspace.name,
            description: Workspace.description,
            id: Workspace.id,
            subdomain: Workspace.subdomain,
            image: Workspace.image,
            accentColor: Workspace.accentColor,

        }).from(Workspace).leftJoin(Board, eq(Board.workspaceId, Workspace.id)).where(eq(Workspace.id, input.id))
        type Result = typeof rows[0] & {
            boards: {
                id: string,
                name: string,
            }[]
        }

        const result = rows.reduce<Result>(
            (acc, row) => {

                if (row.boards) {

                    //check if the board is already in the array
                    const boardIndex = acc.boards.findIndex((board) => board.id === row.boards?.id)
                    if (boardIndex === -1) {
                        acc.boards.push({
                            id: row.boards.id,
                            name: row.boards.name,
                        })
                    }

                }
                return acc;
            },
            {
                ...rows[0],
                boards: [] as any
            }
        );

        return result
    }),

    createWorkspace: protectedProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        subdomain: z.string(),
        image: z.string().optional(),
        accentColor: z.string().optional(),
    })).mutation(async ({ input, ctx }) => {
        const { db } = ctx;
        const userId = ctx.user?.id

        return db.insert(Workspace).values({
            name: input.name,
            description: input.description,
            subdomain: input.subdomain,
            image: input.image,
            accentColor: input.accentColor,
            userId: userId,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
            id: nanoid(),
        }).returning({
            id: Workspace.id,
        })
    }),

})
