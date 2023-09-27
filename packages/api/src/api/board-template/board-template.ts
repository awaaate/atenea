import { BoardTemplate } from "@shared/db/src/schema";
import { protectedProcedure, router } from "../../trpc";
import { z } from "zod";

export const boardTemplateRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    const { db } = ctx;
    return db.query.BoardTemplate.findMany();
  }),
  deleteAll: protectedProcedure.mutation(({ ctx }) => {
    const { db } = ctx;
    return db.delete(BoardTemplate);
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        boardId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const temaplateValues = {
        name: input.name,
        description: input.description,
        image: input.image,
        boardId: input.boardId,
        id: crypto.randomUUID(),
      };
      const boardTemplate = await db
        .insert(BoardTemplate)
        .values(temaplateValues)
        .returning({
          id: BoardTemplate.id,
        });
      return boardTemplate;
    }),
});
