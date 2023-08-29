import { InsertProject, InsertProposal, db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { formSchema } from "@/components/forms/form-schema";
import { proposal, teamMember, proposalToTeamMember, category, categoryToProposal, budgetSection, roadmapSection, project } from "@/db/schema";
import { eq } from "drizzle-orm";


export const appRouter = router({
    // We can add more routes here
    getTeamMembers: publicProcedure.query(() => {
        return db.query.teamMember.findMany({
            with: {
                socialHandles: true,
            }
        })
    }),

    getCategories: publicProcedure.query(() => {
        return db.query.category.findMany()
    }),
    getProjects: publicProcedure.query(() => {
        return db.query.project.findMany()
    }),

    updateProposal: publicProcedure.input(formSchema).mutation(async ({ input }) => {

        //update the proposal first or create
        console.log("input", input)
        const { budget, description, id, roadmap, team, title, categories, coverImage, project: projectInput } = input
        await db.transaction(async (db) => {


            const dataToInsert: InsertProposal = {
                budgetTotal: budget.totalAmount || 0,
                content: "",
                description: description,
                title: title,
                revised: false,
                createdAt: new Date().toDateString(),
                updatedAt: new Date().toDateString(),
                coverImage: coverImage,
                id,

            }
            await db.insert(proposal).values(dataToInsert).onConflictDoUpdate({
                target: [proposal.id],
                set: {
                    ...dataToInsert,
                }
            })



            //add the team memebers

            if (!team || !team[0]) {
                console.log("no team for", id)
            } else {

                const filteredTeam = team.map(t => {
                    if (!t || !t?.name) return false;
                    return {
                        id: t.id,
                        name: t.name || "without name",
                        what: t.what,
                        walletAddress: t.walletAddress || "",
                        updatedAt: new Date().toDateString(),
                        createdAt: new Date().toDateString(),
                        socialHandles: t.socialmediaHandles ? t.socialmediaHandles.map(s => ({
                            name: s?.name,
                            url: s?.url,
                            teamMemberName: t.name
                        })) : []

                    }
                }).filter(b => b !== false) as any

                const returnTeam = await db.insert(teamMember).values(filteredTeam).onConflictDoNothing().returning({
                    name: teamMember.name,
                })
                console.log("returnTeam", returnTeam)
                if (!returnTeam[0]) console.log("no team for", id)
                else {
                    await db.insert(proposalToTeamMember).values(
                        returnTeam.map(t => ({
                            teamMemberName: t.name,
                            proposalId: id
                        }))
                    ).onConflictDoNothing()
                }

            }



            //add the categories
            console.log("categories", !categories)
            if (!categories) console.log("no categories for", id)

            else {

                const returnCategories = await db.insert(category).values(
                    categories.map(c => ({
                        id: c?.id,
                        name: c.name || "Other",
                        updatedAt: new Date().toDateString(),
                        createdAt: new Date().toDateString(),
                    }))
                ).onConflictDoNothing().returning({
                    name: category.name,
                })

                //add the proposal to categories
                if (!returnCategories[0]) console.log("no returning categories for", id)
                else {
                    await db.insert(categoryToProposal).values(
                        returnCategories.map(c => ({
                            categoryName: c.name,
                            proposalId: id
                        }))
                    ).onConflictDoNothing()
                }
            }



            //add the budget sections
            if (!budget.items[0]) console.log("no budget for", id)
            else {
                await db.insert(budgetSection).values(
                    budget.items.map(b => ({
                        name: b?.name || "",
                        description: b?.description || "",
                        amount: b ? b.amount || 0 : 0,
                        proposalId: id,
                        updatedAt: new Date().toDateString(),
                        createdAt: new Date().toDateString(),
                    }))
                ).onConflictDoNothing()
            }


            //add the roadmap sections

            if (!roadmap || !roadmap.items || !roadmap.items[0].name) console.log("no roadmap for", id)
            else {

                await db.insert(roadmapSection).values(
                    roadmap.items.map(r => ({
                        name: r.name || "",
                        description: r.description || "",
                        proposalId: id,
                        updatedAt: new Date().toDateString(),
                        createdAt: new Date().toDateString(),
                    }))
                ).onConflictDoNothing()
            }

            if (!projectInput || !projectInput.title) console.log("no project for", id)
            else {
                const returnProject = await db.insert(project).values({
                    title: projectInput.title || "",
                    description: projectInput.description || "",
                    updatedAt: new Date().toDateString(),
                    createdAt: new Date().toDateString(),

                }).onConflictDoNothing().returning({
                    id: project.id,
                })

                //update the proposal with the project
                if (!returnProject[0]) console.log("no project for", id)
                else {
                    await db.update(proposal).set({
                        projectId: returnProject[0].id
                    }).where(eq(proposal.id, id))
                }
            }

        })
    }),

})

export type AppRouter = typeof appRouter;