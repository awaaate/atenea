import { describe, expect, it } from "vitest";
import { dataSourceRouter } from "./data-source";
import { db } from "@shared/db";
import fs from "fs/promises";
const caller = dataSourceRouter.createCaller({ user: null, db });

describe(
  "Data source",
  () => {
    it.skip("Should get the proposal meta", async () => {
      const data = await caller.proposalsMeta({
        first: 1000,
        orderBy: "createdTimestamp",
        orderDirection: "desc",
      });
      //count with categories
      const categories = data.filter((d) => d.categories.length > 0);

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

describe("Testing prop updates", () => {
  it.skip("Should get All prop updated", async () => {
    const data = await caller.getAllPropUpdates();
    console.log(JSON.stringify(data, null, 2));
    expect(data).toBeDefined();
  });

  it.skip("Should get prop updated", async () => {
    const data = await caller.getPropUpdates(["314"]);
    console.log(JSON.stringify(data, null, 2));
    expect(data).toBeDefined();
  });
});
