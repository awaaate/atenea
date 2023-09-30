import { describe, it } from "vitest";
import { dataSourceRouter } from "./data-source";
import { db } from "@shared/db";
import fs from "fs/promises";
const caller = dataSourceRouter.createCaller({ user: null });

describe(
  "Data source",
  () => {
    it("Should get the proposal meta", async () => {
      const data = await caller.proposalsMeta({
        first: 1000,
        orderBy: "createdTimestamp",
        orderDirection: "desc",
      });
      //count with categories
      const categories = data.filter((d) => d.categories.length > 0);
      console.log(
        `Total proposals: ${data.length}, proposals with categories: ${categories.length}`
      );

      await fs.writeFile("./data.json", JSON.stringify(data, null, 2));
      return data;
    });

    it.skip("Should get the proposal team members", async () => {
      const data = await caller.getProposalTeamMembers(350);
      console.log(JSON.stringify(data, null, 2));
      return data;
    });
  },
  { timeout: 100000 }
);
