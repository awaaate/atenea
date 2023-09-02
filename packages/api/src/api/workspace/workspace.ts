import { Board, Workspace } from "@shared/db/src/schema";
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
                createdAt: Board.createdAt,
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
                createdAt: string,
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
                            createdAt: row.boards.createdAt,
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

        return {
            ...result,
            boards: result.boards.sort((a, b) => {
                //sort the boards by createdAt
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }).map((board) => {
                //remove the createdAt field
                return {
                    id: board.id,
                    name: board.name,
                }
            })
        }
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

    getWorkspace: protectedProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;
        const userId = ctx.user?.id
        return db.query.Workspace.findFirst({
            where(fields, { and, eq }) {
                return and(
                    eq(fields.id, input.id),
                    eq(fields.userId, userId)
                )
            }
        })

    }),

})
