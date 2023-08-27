"use server"

import { getSession } from "@/lib/auth/getSession";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import { env } from "@/env.mjs";
import { createSiteInput } from "./validations";
import { workspaceSchema } from "@shared/templates";



export const createSite = async (formData: FormData) => {
    const session = await getSession();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subdomain = formData.get("subdomain") as string;



    try {

        const validated = workspaceSchema.parse({
            name,
            description,
            subdomain,
            isPublic: false,
            accentColor: "default",

        });


        const response = await db.site.create({
            data: {
                ...validated,
                user: {
                    connect: {
                        id: session.user.id,
                    }
                }
            },
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

