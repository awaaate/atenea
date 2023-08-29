import * as z from "zod";


export const formSchema = z.object({
    team: z.array(
        z
            .object({
                id: z.number().optional().describe("ID of the team member"),
                name: z.string().describe("Name of the team member"),
                what: z.string().describe("What he did in the team"),
                socialmediaHandles: z
                    .array(
                        z.object({
                            name: z.string(),
                            url: z.string().url(),
                            id: z.number().optional(),
                        })
                    )
                    .optional()
                    .describe("Social media handles"),
                walletAddress: z.string().optional().describe("Wallet address"),
            })
            .optional()
    ),
    budget: z.object({
        totalAmount: z.number().describe("Total amount in usd"),
        items: z
            .array(
                z
                    .object({
                        name: z.string().describe("Name of the item"),
                        amount: z.number().optional().describe("Amount for this item"),
                        description: z.string().optional().describe("Description"),
                        nouns: z.number().optional().describe("Noun if they ask"),
                        id: z.number().optional().describe("ID of the item"),
                    })
                    .optional()
            )
            .describe("Budget sections"),
    }),
    roadmap: z.object({
        items: z
            .array(
                z.object({
                    name: z.string().describe("Name of the item"),
                    description: z.string().optional().describe("Description"),
                    id: z.number().optional().describe("ID of the item"),
                })
            )
            .optional()
            .describe("Roadmap items"),
    }),

    description: z
        .string()
        .describe("Description of the proposal")
        .min(100)
        .max(1000),
    categories: z
        .array(
            z.object({
                name: z.string(),
            })
        )
        .optional()
        .describe("Categories"),

    coverImage: z.string().optional().describe("Cover image"),
    project: z
        .object({
            title: z
                .string()
                .describe("Name of the project where the proposal is for "),
            description: z.string().optional().describe("Description of the project"),
            id: z.number().optional().describe("ID of the project"),
        })
        .optional(),
    title: z.string().describe("Title of the proposal").min(10),
    id: z.number().describe("ID of the proposal"),
});

export type FormValues = z.infer<typeof formSchema>;
export const defaultFormValues = (values: Partial<FormValues>) => {
    return {
        roadmap: values.roadmap || {
            items: [],
        },
        budget: values.budget || {
            totalAmount: 0,
            items: [],
        },
        team: values.team || [],
        categories: values.categories || [],
        coverImage: values.coverImage || "",
        project: values.project || {
            title: "",
            description: "",
            proposals: [],
        },
        title: values.title || "",
        description: values.description || "",
        id: values.id || 0,

    }
}