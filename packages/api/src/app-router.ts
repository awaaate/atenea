import { boardTemplateRouter } from "./api/board-template/board-template";
import { boardsRouter } from "./api/boards";
import { usersRouter } from "./api/users/users";
import { workspaceRouter } from "./api/workspace/workspace";
import { router } from "./trpc";

export const appRouter = router({
  boards: boardsRouter,
  worksapce: workspaceRouter,
  users: usersRouter,
  boardTemplate: boardTemplateRouter,
});

export type AppRouter = typeof appRouter;
