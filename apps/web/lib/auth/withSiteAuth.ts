import { db } from "@/lib/db";
import { getSession } from "./getSession";



export const withSiteAuth = (action: any) => {
    return async (
        formData: FormData | null,
        siteId: string,
        key: string | null
    ) => {
        const session = await getSession();
        if (!session) {
            return {
                error: "Not authenticated",
            };
        }
        const site = await db.site.findUnique({
            where: {
                id: siteId,
            },
        });
        if (!site || site.userId !== session.user.id) {
            return {
                error: "Not authorized",
            };
        }

        return action(formData, site, key);
    };
}
