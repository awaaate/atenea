import { eq, ne } from "drizzle-orm";
import { FormValues } from "../components/forms/form-schema";
import { InsertProposal, db } from "../db";
import {
  budgetSection,
  category,
  categoryToProposal,
  project,
  proposal,
  proposalToTeamMember,
  roadmapSection,
  socialHandle,
  teamMember,
} from "../db/schema";

export async function updateProposal(input: FormValues) {
  const {
    budget,
    description,
    id,
    roadmap,
    team,
    title,
    categories,
    coverImage,
    project: projectInput,
  } = input;
  await db.transaction(async (db) => {
    console.log("updating proposal", coverImage);
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
    };
    await db
      .insert(proposal)
      .values(dataToInsert)
      .onConflictDoUpdate({
        target: [proposal.id],
        set: {
          ...dataToInsert,
        },
      });

    //add the team memebers

    for (const teamItem of team) {
      if (!teamItem) continue;
      await db
        .insert(teamMember)
        .values({
          name: teamItem.name || "without name",
          what: teamItem.what,
          walletAddress: teamItem.walletAddress || "",
          socialHandles:
            input.team.find((t) => t?.name === teamItem.name)
              ?.socialmediaHandles || [],
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoUpdate({
          target: [teamMember.name],
          set: {
            name: teamItem.name || "without name",
            what: teamItem.what,
            walletAddress: teamItem.walletAddress || "",
            updatedAt: new Date().toDateString(),
          },
        });
      await db
        .insert(proposalToTeamMember)
        .values({
          teamMemberName: teamItem.name,
          proposalId: id,
        })
        .onConflictDoNothing();
    }

    for (const cat of categories || []) {
      if (!cat) continue;

      await db
        .insert(category)
        .values({
          name: cat.name || "Other",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoNothing();

      await db
        .insert(categoryToProposal)
        .values({
          categoryName: cat.name,
          proposalId: id,
        })
        .onConflictDoNothing();
    }

    for (const budgetItem of budget.items || []) {
      if (!budgetItem) continue;
      await db
        .insert(budgetSection)
        .values({
          id: budgetItem.id,
          name: budgetItem.name || "",
          description: budgetItem.description || "",
          amount: budgetItem.amount || 0,
          proposalId: id,
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoUpdate({
          target: [budgetSection.id],
          set: {
            name: budgetItem.name || "",
            description: budgetItem.description || "",
            amount: budgetItem.amount || 0,
            proposalId: id,
            updatedAt: new Date().toDateString(),
          },
        });
    }

    for (const roadmapItem of roadmap.items || []) {
      if (!roadmapItem) continue;
      await db
        .insert(roadmapSection)
        .values({
          id: roadmapItem.id,
          name: roadmapItem.name || "",
          description: roadmapItem.description || "",
          proposalId: id,
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoUpdate({
          target: [roadmapSection.id],
          set: {
            name: roadmapItem.name || "",
            description: roadmapItem.description || "",
            proposalId: id,
            updatedAt: new Date().toDateString(),
          },
        });
    }

    if (!projectInput || !projectInput.title) console.log("no project for", id);
    else {
      const returnProject = await db
        .insert(project)
        .values({
          id: projectInput.id,
          title: projectInput.title || "",
          description: projectInput.description || "",
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoUpdate({
          target: [project.id],
          set: {
            title: projectInput.title || "",
            description: projectInput.description || "",
            updatedAt: new Date().toDateString(),
          },
        })
        .returning({
          insertedId: project.id,
        });

      //update the proposal with the project
      if (!returnProject[0]?.insertedId) console.log("no project for", id);
      else {
        await db
          .update(proposal)
          .set({
            projectId: returnProject[0].insertedId,
          })
          .where(eq(proposal.id, id));
      }
    }
  });
}
