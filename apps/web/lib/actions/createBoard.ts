
"use server"

import { getSession } from "@/lib/auth/getSession";
import { withSiteAuth } from "@/lib/auth/withSiteAuth";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import { env } from "@/env.mjs";
import type { Site } from "@prisma/client";

export const createBoard = withSiteAuth(
    async (_: FormData, site: Site) => {
        const session = await getSession();
        if (!session?.user.id) {
            return {
                error: "Not authenticated",
            };
        }
        const response = await db.board.create({
            data: {
                siteId: site.id,
                userId: session.user.id,
                name: "Unnamed board",
            },
        });

        await revalidateTag(
            `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
        );
        site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

        return response;
    }
);
