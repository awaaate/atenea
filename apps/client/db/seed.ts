//read the data file in ./data.json

import { config } from "dotenv";
config();

console.log(process.env.DATABASE_URL, "DATABASE_URL");
import DATA from "./data/data.json";
import PROP_DATA from "./data/props/350.json";
import path from "path";
import fs from "fs/promises";
import { InsertProposal, db } from ".";

import {
  budgetSection,
  category,
  categoryToProposal,
  project,
  proposal,
  proposalToTeamMember,
  roadmapSection,
  teamMember,
} from "./schema";
import { eq } from "drizzle-orm";
import MATTY from "./data/proposals2.json";

const __dirname = path.resolve();
const dataDir = path.join(__dirname, "db", "data", "data.json");

let totalArray = Array.from({ length: 400 }, (_, i) => i + 1);

async function getFileData(id: string): Promise<typeof PROP_DATA | null> {
  const filePath = path.join(__dirname, "db", "data", "props", id + ".json");

  //check if file exists
  try {
    await fs.access(filePath);
  } catch (e) {
    return null;
  }

  //read file

  const dataString = await fs.readFile(filePath, "utf-8");

  return JSON.parse(dataString) as typeof PROP_DATA;
}
async function addCategory(
  db: any,
  categories: {
    name: string;
  }[],
  proposalId: number
) {
  for (const _category of categories) {
    try {
      await db
        .insert(category)
        .values({
          name: _category.name,
          updatedAt: new Date().toDateString(),
          createdAt: new Date().toDateString(),
        })
        .onConflictDoNothing();

      const res = await db
        .insert(categoryToProposal)
        .values({
          categoryName: _category.name,
          proposalId: proposalId,
        })
        .returning({
          categoryName: categoryToProposal.categoryName,
          proposalId: categoryToProposal.proposalId,
        })
        .onConflictDoNothing();
      if (res) {
        console.log("added category", {
          categoryName: _category.name,
          proposalId: proposalId,
        });
      }
    } catch (error) {
      console.log("error adding category", {
        categoryName: _category.name,
        proposalId: proposalId,
      });
      console.log(error);
      continue;
    }
  }
}
async function main() {
  const rawfile = await fs.readFile(dataDir);

  const data = JSON.parse(rawfile.toString()) as typeof DATA;
  const proposals = data.data.proposals;
  // eslint-disable-next-line no-undef
  await db.transaction(async (db) => {
    let count = 0;
    await Promise.all(
      proposals.map(async (proposalData) => {
        count++;
        const proposalId =
          parseInt(proposalData.id.trim()) || Math.random() * 1000 + 400;

        totalArray = totalArray.filter((id) => proposalId !== id);

        console.log("PROPOSAL ID", proposalId);
        console.log("Total left", totalArray.length - count);
        /*   console.log("TOTAL MISSING", totalArray.join(", ")) */

        const moreData = await getFileData(proposalData.id);
        const mattyData = MATTY.find((p) => p.No === proposalId);
        if (moreData === null) {
          console.log("No Pepe data for", proposalData.id);
        }
        if (mattyData === undefined) {
          console.log("no matty data for", proposalData.id);
          return;
        }

        //just add the categories

        const dataToInsert: InsertProposal = {
          budgetEth: Number(moreData?.budget.totalAmount || mattyData.ETH) || 0,
          budgetUsd: Number(mattyData.USDC) || 0,
          status: mattyData.Status || "",
          voting: mattyData.Voting || "",
          extraEth: mattyData["Has extra ETH"] === "Yes" ? true : false,
          totalPropValue: Number(mattyData["Total prop value"]) || 0,
          trueCost: Number(mattyData["True cost"]) || 0,
          product: mattyData.Product || "",
          discussionLink: mattyData["Discussion links"] || "",
          content: proposalData.description,
          description: moreData?.description || "",
          title: proposalData.title,
          revised: false,
          createdAt: new Date(
            parseInt(proposalData.createdTimestamp) * 100
          ).toDateString(),
          updatedAt: new Date().toDateString(),
          coverImage: moreData?.coverImage,
          id: proposalId,
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
        console.log("Added Proposal: ", dataToInsert.id);
        const categories =
          moreData?.categories ||
          mattyData?.Category.split(",").map((c) => ({ name: c.trim() }));

        await addCategory(db, categories, proposalId);
        //add the team memebers
        //"Team": "verb-elad (https://www.notion.so/verb-elad-7f34c9d2b9854a458352c1698bdbb15e?pvs=21), verb-davidbrai (https://www.notion.so/verb-davidbrai-b7447b764ed94743be710775ebf13b2c?pvs=21)",
        const team =
          moreData?.team ||
          mattyData?.Team.split(",").map((t) => {
            //remove the notion link
            const name = t.split("(")[0].trim();
            return {
              name,
              what: "",
              walletAddress: "",
              socialmediaHandles: [],
            };
          });
        if (!team[0]) {
          console.log("no team for", proposalData.id);
        } else {
          const returnTeam = await db
            .insert(teamMember)
            .values(
              team.map((t) => ({
                name: t.name || "without name",
                what: t.what,
                walletAddress: t.walletAddress,
                updatedAt: new Date().toDateString(),
                createdAt: new Date().toDateString(),
                socialHandles: JSON.stringify(t.socialmediaHandles),
              }))
            )
            .onConflictDoNothing()
            .returning({
              name: teamMember.name,
            });

          console.log("Triying to add Team: ", team);
          if (!returnTeam[0]) console.log("no team added for", proposalData.id);
          else {
            await db
              .insert(proposalToTeamMember)
              .values(
                returnTeam.map((t) => ({
                  teamMemberName: t.name,
                  proposalId: proposalId,
                }))
              )
              .onConflictDoNothing();
          }
        }

        //add the categories
        if (!moreData) {
          console.log("No more data for", proposalData.id);
          console.log("Skipping");
          return;
        }

        //add the budget sections
        if (!moreData.budget.items[0])
          console.log("no budget for", proposalData.id);
        else {
          await db
            .insert(budgetSection)
            .values(
              moreData.budget.items.map((b) => ({
                name: b.name,
                description: b.description,
                amount: parseInt(b.amount) || 0,
                proposalId: proposalId,
                updatedAt: new Date().toDateString(),
                createdAt: new Date().toDateString(),
              }))
            )
            .onConflictDoNothing();
        }

        //add the roadmap sections

        if (!moreData.roadmap.items[0])
          console.log("no roadmap for", proposalData.id);
        else {
          await db
            .insert(roadmapSection)
            .values(
              moreData.roadmap.items.map((r) => ({
                name: r.name,
                description: r.description,
                proposalId: proposalId,
                updatedAt: new Date().toDateString(),
                createdAt: new Date().toDateString(),
              }))
            )
            .onConflictDoNothing();
        }
      })
    );
  });

  console.log("\n\n\n\n");
}

main();
