import { eq } from "@shared/db/src/orm";
import { Board } from "@shared/db/src/schema";
import { nanoid } from "nanoid";
import * as z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const boardsRouter = router({
  getSiblingBoards: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { db } = ctx;

      const workspace = await db.query.Board.findFirst({
        where: eq(Board.id, input.id),
        columns: {
          workspaceId: true,
        },
      });
      if (!workspace) throw new Error("Board not found");
      const workspaceId = workspace.workspaceId;
      if (!workspaceId) throw new Error("Workspace not found");

      const boards = await db.query.Board.findMany({
        where: eq(Board.workspaceId, workspaceId),
        columns: {
          id: true,
          name: true,
        },
      });

      return {
        workspaceId,
        boards,
      };
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const { db } = ctx;
    const userId = ctx.user?.id;
    console.log(userId);
    return db.query.Board.findMany({
      where(fields, { eq }) {
        return eq(fields.userId, userId);
      },
    });
  }),
  setDraft: publicProcedure
    .input(
      z.object({
        id: z.string(),
        draft: z.any(),
        name: z.string(),
        background: z.string(),
        description: z.string(),
        accentColor: z.string(),
        coverImage: z.string().optional(),
        coverImageEnabled: z.boolean().default(false).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { db } = ctx;

      return db
        .update(Board)
        .set({
          draft: input.draft,
          name: input.name,
          background: input.background,
          accentColor: input.accentColor,
          coverImage: input.coverImage,
          coverImageEnabled: input.coverImageEnabled,
          description: input.description,
        })
        .where(eq(Board.id, input.id))
        .returning({
          draft: Board.draft,
          name: Board.name,
        });
    }),

  publish: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentContent: z.any(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;

      return db
        .update(Board)
        .set({
          published: true,
          content: input.currentContent,
        })
        .where(eq(Board.id, input.id))
        .returning({
          content: Board.draft,
        });
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { db } = ctx;

      return db.query.Board.findFirst({
        where: eq(Board.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const userId = ctx.user?.id;
      if (!userId) throw new Error("User not found");
      const board = {
        id: nanoid(),
        background: "",
        name: input.name,
        workspaceId: input.workspaceId,
        userId: userId,
        createdAt: new Date().toISOString(), // convert Date to string
        updatedAt: new Date().toISOString(), // convert Date to string
      };
      return db.insert(Board).values(board).returning({
        id: Board.id,
        name: Board.name,
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;

      return db.delete(Board).where(eq(Board.id, input.id)).returning({
        id: Board.id,
        name: Board.name,
      });
    }),

  duplicate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        workspaceId: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;

      const board = await db.query.Board.findFirst({
        where: eq(Board.id, input.id),
      });
      if (!board) throw new Error("Board not found");
      const userId = ctx.user?.id;
      if (!userId) throw new Error("User not found");
      const newBoard = {
        ...board,
        id: nanoid(),
        name: board.name + " (copy)",
        workspaceId: input.workspaceId || board.workspaceId,
        createdAt: new Date().toISOString(), // convert Date to string
        updatedAt: new Date().toISOString(), // convert Date to string
        userId: userId,
      };
      return db.insert(Board).values(newBoard).returning({
        id: Board.id,
        name: Board.name,
      });
    }),
  setConfig: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        newId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;

      return db
        .update(Board)
        .set({
          name: input.name,
          description: input.description,
          id: input.newId,
        })
        .where(eq(Board.id, input.id))
        .returning({
          id: Board.id,
        });
    }),
  //generate
  generate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        content: z.any(),
        workspaceId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db, user } = ctx;
      const userId = user?.id;
      if (!userId) throw new Error("User not found");
      const board = {
        id: input.id,
        name: input.name,
        workspaceId: input.workspaceId,
        userId: userId,
        description: input.description,
        createdAt: new Date().toISOString(), // convert Date to string
        updatedAt: new Date().toISOString(), // convert Date to string
        draft: input.content,
        coverImage:
          "https://utfs.io/f/ad40a950-e6e3-4b60-98a9-964466aae9d3-v6celk.jpg",
        coverImageEnabled: true,
        background: "rgb(226, 226, 226)",
      };
      return db.insert(Board).values(board).returning({
        id: Board.id,
        name: Board.name,
        draft: Board.draft,
      });
    }),
});
