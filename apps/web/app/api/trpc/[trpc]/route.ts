
import { env } from "@/env.mjs";
import { appRouter, fetchRequestHandler, createContext } from "@shared/api";
import { db } from "@shared/db";


const handler = (req: Request) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: (opts) => {
        return createContext(db, env.AUTH_SECRET, opts);
    }
});

export { handler as GET, handler as POST }