import "dotenv/config";
import { it, expect } from "vitest";
import { boardsRouter } from "./boards";

import { db } from "@shared/db";
import { createProposalBoard } from "./create-proposal-board";

const boards = boardsRouter.createCaller({
  db,
  user: {
    id: "cll5fq2so0000fv81s8w841ot",
  },
});

it.skip("Should get unique board", async () => {
  const result = await boards.getSiblingBoards({
    id: "cll8ww7s50001fvl58d8qx4b3",
  });

  console.log(result);
  expect(result).toBeDefined();
});

it.skip("It should get all the board from the user", async () => {
  //test the trpc

  const result = await boards.getAll();

  console.log(result);
  expect(result).toBeDefined();
});

it(
  "It should generate all the boards",
  async () => {
    //test the trpc

    const proposalsList = Array.from({ length: 391 }, (_, i) => i + 1).map(
      (id) => {
        return id.toString();
      }
    );
    const all = await Promise.all(
      //delete all
      /*       proposalsList.map(async (id) => {
        const result = await boards.delete({
          id,
        });
        console.log(result);
      }) */
      proposalsList.map(async (id) => {
        const result = await boards.generate({
          name: `Proposal ${id}`,
          description: `Client for proposal ${id}`,
          workspaceId: "ecb3cf58-5a4e-47b1-abac-de5b68dad88e",
          id,
          content: createProposalBoard(Number(id)),
        });
        console.log(result);
      })
    );

    expect(all).toBeDefined();

    expect(all).toBeDefined();
  },
  { timeout: 100000 }
);

it.skip("Should publish the board", async () => {
  const result = await boards.publish({
    id: "cll8ww7s50001fvl58d8qx4b3",
    currentContent: {
      nodes: [],
    },
  });

  console.log(result);
  expect(result).toBeDefined();
});

it.skip("Should get the board", async () => {
  const result = await boards.get({
    id: "cll8ww7s50001fvl58d8qx4b3",
  });

  console.log(result);
  expect(result).toBeDefined();
});
