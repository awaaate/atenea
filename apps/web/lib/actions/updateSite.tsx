"use server";

import { getSession } from "@/lib/auth/getSession";
import { db } from "../db";
import { revalidateTag } from "next/cache";
import { env } from "@/env.mjs";
import { createSiteInput } from "./validations";

export const createSite = async (formData: FormData) => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const siteId = formData.get("siteId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const validated = createSiteInput.parse({
      name,
      description,
      subdomain,
    });

    const response = await db.site.update({
      where: {
        id: siteId,
      },
      data: {
        ...validated,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    await revalidateTag(`${subdomain}.${env.NEXT_PUBLIC_APP_URL}-metadata`);
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
};
