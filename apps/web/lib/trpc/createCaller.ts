

import { appRouter } from "@shared/api/src/app-router";
import { Session } from "@/lib/auth/getSession";
import { db } from "@shared/db";


/**
 * Creates a caller function that can be used to make TRPC requests.
 * @param user Optional session user object.
 * @returns A TRPC caller function.
 */
export function createCaller(user?: Session["user"]) {
    return appRouter.createCaller({
        db,
        user: user || null,
    });
}

