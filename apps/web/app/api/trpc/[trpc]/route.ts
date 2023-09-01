
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { appRouter, fetchRequestHandler, createContext } from "@shared/api";
import { db } from "@shared/db";

export const runtime = "edge"

const handler = (req: Request) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async (opts) => {
        const session = await getSession();
        return createContext(db, {
            user: session?.user || null,
        });
    }
});

export { handler as GET, handler as POST }