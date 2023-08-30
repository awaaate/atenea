import { proposal, category, teamMember, budgetSection, roadmapSection, project, categoryToProposal, proposalToTeamMember, socialHandle } from "../db/schema";
import { SelectProposal, db } from "../db";
import { eq } from "drizzle-orm";

export async function getUniqueProposal(proposalId: number) {
    const response = await db.select({
        title: proposal.title,
        budgetTotal: proposal.budgetTotal,
        description: proposal.description,
        coverImage: proposal.coverImage,
        id: proposal.id,
        categories: category,
        team: teamMember,
        socialHandles: socialHandle,
        budget: budgetSection,
        roadmap: roadmapSection,
        project: project,

    }).from(proposal)
        .leftJoin(
            categoryToProposal, eq(proposal.id, categoryToProposal.proposalId),
        )
        .leftJoin(
            budgetSection, eq(proposal.id, budgetSection.proposalId)
        )
        .leftJoin(
            roadmapSection, eq(proposal.id, roadmapSection.proposalId)
        )
        .leftJoin(
            project, eq(proposal.projectId, project.id)
        )
        .leftJoin(
            category, eq(categoryToProposal.categoryName, category.name)
        )
        .leftJoin(
            proposalToTeamMember, eq(proposal.id, proposalToTeamMember.proposalId))
        .leftJoin(teamMember, eq(proposalToTeamMember.teamMemberName, teamMember.name))
        .leftJoin(socialHandle, eq(teamMember.name, socialHandle.teamMemberName))
        .where(eq(proposal.id, proposalId))


    //console.log("response", JSON.stringify(response, null, 2), proposalId)

    //console.log("response", JSON.stringify(response, null, 2), proposalId)
    // const prop = response[0]
    //join all in the same
    type Cleaned = SelectProposal & {
        categories: Set<string>,
        team: Set<string>,
        budget: Set<number>,
        socialHandles: Set<number>,
        roadmap: Set<number>,
    }
    const cleaned: Cleaned = response.reduce((acc, curr) => {
        return {
            ...acc,
            ...curr,
            categories: acc.categories.add(curr.categories?.name),
            team: acc.team.add(curr.team?.name),
            budget: acc.budget.add(curr.budget?.id),
            roadmap: acc.roadmap.add(curr.roadmap?.id),
            socialHandles: acc.socialHandles.add(curr.socialHandles?.id),
        }
    }, {
        categories: new Set(),
        team: new Set(),
        budget: new Set(),
        roadmap: new Set(),
        socialHandles: new Set(),

    } as any)
    const { categories, team, budget, roadmap, socialHandles, ...rest } = cleaned
    const prop = {
        ...rest,
        "categories": Array.from(cleaned.categories).map(name => {
            const category = response.find(r => r.categories?.name === name)?.categories

            if (!category) return undefined
            return {
                name: category.name,
            }
        }
        ),
        "team": Array.from(cleaned.team).map(name => {
            const team = response.find(r => r.team?.name === name)?.team
            if (!team) return undefined
            return {
                name: team.name,
                what: team.what,
                walletAddress: team.walletAddress,
                socialmediaHandles: Array.from(cleaned.socialHandles).map(id => {
                    //extract de full data from the social handle
                    const socialHandle = response.find(r => r.socialHandles?.id === id)?.socialHandles
                    console.log("socialHandle", socialHandle)
                    //check if the social handle is from the team member
                    if (!socialHandle || socialHandle.teamMemberName !== team.name) return undefined
                    return {
                        name: socialHandle.name,
                        url: socialHandle.url,
                        id: socialHandle.id,
                    }
                }).filter(Boolean)
            }
        }),
        "budget": {
            items: Array.from(cleaned.budget).map(id => {
                const budget = response.find(r => r.budget?.id === id)?.budget
                if (!budget) return undefined
                return {
                    name: budget.name,
                    description: budget.description,
                    amount: budget.amount,
                    id: budget.id,
                }
            }
            ),
            totalAmount: cleaned.budgetTotal || 0
        },
        "roadmap": {
            items: Array.from(cleaned.roadmap).map(id => {
                const roadmap = response.find(r => r.roadmap?.id === id)?.roadmap
                if (!roadmap) return undefined
                return {
                    name: roadmap.name,
                    description: roadmap.description,
                    id: roadmap.id,
                }
            }),

        }

    }

    return prop
}