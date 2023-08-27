import { z } from "zod";

function validateSlug(slug: string) {
    return slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
}
export const workspaceSchema = z.object({
    name: z.string().min(5).max(20),
    description: z.string().min(10).max(100),
    isPublic: z.boolean(),
    subdomain: z.string().refine(validateSlug, {
        message: "Invalid subdomain",
    }),
    accentColor: z.string(),
})