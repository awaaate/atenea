
import { getSession } from "@/lib/auth/getSession";
import { appRouter } from "@shared/api/src/app-router";

import { createContext } from "@shared/api/src/context";
import { fetchRequestHandler } from "@shared/api/src/fetch-handler";
import { db } from "@shared/db";

//export const runtime = "edge"

const handler = (req: Request) => fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async (opts) => {
        const session = await getSession();
        return createContext(db, {
            user: session?.user || null,
        });
    },

});

export { handler as GET, handler as POST }