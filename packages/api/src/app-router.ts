import { boardsRouter } from './api/boards'
import { workspaceRouter } from './api/workspace/workspace'
import { router } from './trpc'

export const appRouter = router({
    boards: boardsRouter,
    worksapce: workspaceRouter
})

export type AppRouter = typeof appRouter