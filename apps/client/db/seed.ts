//read the data file in ./data.json

import { config } from "dotenv";
config()

console.log(process.env.DATABASE_URL, "DATABASE_URL")
import DATA from "./data/data.json"
import PROP_DATA from "./data/props/350.json"
import path from "path"
import fs from "fs/promises"
import { InsertProposal, db } from ".";

import { budgetSection, category, categoryToProposal, project, proposal, proposalToTeamMember, roadmapSection, teamMember, teamMemberRelations } from "./schema";
import { eq } from "drizzle-orm";


const __dirname = path.resolve();
const dataDir = path.join(__dirname, "db", "data", "data.json");

let totalArray = Array.from({ length: 400 }, (_, i) => i + 1)

async function getFileData(id: string): Promise<typeof PROP_DATA | null> {
  const filePath = path.join(__dirname, "db", "data", "props", id + ".json");

  //check if file exists
  try {
    await fs.access(filePath)
  }
  catch (e) {
    return null
  }

  //read file

  const dataString = await fs.readFile(filePath, "utf-8")

  return JSON.parse(dataString) as typeof PROP_DATA

}
async function main() {
  const rawfile = await fs.readFile(dataDir)

  const data = JSON.parse(rawfile.toString()) as typeof DATA
  const proposals = data.data.proposals
  // eslint-disable-next-line no-undef
  await db.transaction(async (db) => {
    for (let i = 0; i < proposals.length; i++) {

      const proposalData = proposals[i]
      const proposalId = parseInt(proposalData.id.trim()) || Math.random() * 1000 + 400

      totalArray = totalArray.filter((id) => proposalId !== id)

      console.log("PROPOSAL ID", proposalId)

      /*   console.log("TOTAL MISSING", totalArray.join(", ")) */

      const moreData = await getFileData(proposalData.id)

      if (moreData === null) {
        console.log("no data for", proposalData.id)
        continue
      }

      const dataToInsert: InsertProposal = {
        budgetTotal: parseInt(moreData.budget.totalAmount) || 0,
        content: proposalData.description,
        description: moreData.description,
        title: moreData.title,
        revised: false,
        createdAt: new Date(parseInt(proposalData.createdTimestamp) * 100).toDateString(),
        updatedAt: new Date().toDateString(),
        coverImage: moreData.coverImage,
        id: proposalId,

      }
      await db.insert(proposal).values(dataToInsert).onConflictDoUpdate({
        target: [proposal.id],
        set: {
          ...dataToInsert,
        }
      })



      //add the team memebers

      if (!moreData.team[0]) {
        console.log("no team for", proposalData.id)
      } else {
        const returnTeam = await db.insert(teamMember).values(
          moreData.team.map(t => ({
            name: t.name || "without name",
            what: t.what,
            walletAddress: t.walletAddress,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
            socialHandles: t.socialmediaHandles.map(s => ({
              name: s?.name,
              url: s?.url,
              teamMemberName: t.name
            }))

          }))
        ).onConflictDoNothing().returning({
          name: teamMember.name,
        })

        if (!returnTeam[0]) console.log("no team for", proposalData.id)
        else {
          await db.insert(proposalToTeamMember).values(
            returnTeam.map(t => ({
              teamMemberName: t.name,
              proposalId: proposalId
            }))
          ).onConflictDoNothing()
        }

      }



      //add the categories
      if (!moreData.categories[0]) console.log("no categories for", proposalData.id)

      else {
        const returnCategories = await db.insert(category).values(
          moreData.categories.map(c => ({
            name: c.name,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
          }))
        ).onConflictDoNothing().returning({
          name: category.name,
        })

        //add the proposal to categories
        if (!returnCategories[0]) console.log("no categories for", proposalData.id)
        else {
          await db.insert(categoryToProposal).values(
            returnCategories.map(c => ({
              categoryName: c.name,
              proposalId: proposalId
            }))
          ).onConflictDoNothing()
        }
      }



      //add the budget sections
      if (!moreData.budget.items[0]) console.log("no budget for", proposalData.id)
      else {
        await db.insert(budgetSection).values(
          moreData.budget.items.map(b => ({
            name: b.name,
            description: b.description,
            amount: parseInt(b.amount) || 0,
            proposalId: proposalId,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
          }))
        ).onConflictDoNothing()
      }


      //add the roadmap sections

      if (!moreData.roadmap.items[0]) console.log("no roadmap for", proposalData.id)
      else {
        await db.insert(roadmapSection).values(
          moreData.roadmap.items.map(r => ({
            name: r.name,
            description: r.description,
            proposalId: proposalId,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
          }))
        ).onConflictDoNothing()
      }

    }
  })








  console.log("\n\n\n\n")
}


main()