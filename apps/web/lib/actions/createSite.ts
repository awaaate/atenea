"use server"

import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth/getSession";
import { db } from "@shared/db";
import { appRouter } from "@shared/db/src/trpc";
import { revalidateTag } from "next/cache";



export const createSite = async (formData: FormData) => {
    const session = await getSession();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    console.log(JSON.stringify(Object.fromEntries(formData)))
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subdomain = formData.get("subdomain") as string;
    const accentColor = formData.get("accentColor") as string;

    const caller = appRouter.createCaller({
        db,
        user: session.user,
    })

    try {



        const response = await caller.worksapce.createWorkspace({
            name,
            description,
            subdomain,
            accentColor: accentColor,
        });

        await revalidateTag(
            `${subdomain}.${env.NEXT_PUBLIC_APP_URL}-metadata`,
        );
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This subdomain is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
}

