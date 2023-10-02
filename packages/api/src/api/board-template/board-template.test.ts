import "dotenv/config";
import { it, expect } from "vitest";
import { boardTemplateRouter } from "./board-template";

import { db } from "@shared/db";

const boards = boardTemplateRouter.createCaller({
  db,
  user: {
    id: "cll5fq2so0000fv81s8w841ot",
  },
});

it.skip("Should generate all the boards", async () => {
  const result = await boards.create({
    name: "Proposal Template",
    description: "This is a template for proposals",
    image: "/templates/proposal-template.png",
    boardId: "proposal-template",
  });

  console.log(result);
  expect(result).toBeDefined();
});

it.skip("Should get all templates", async () => {
  const result = await boards.getAll();

  console.log(result);
  expect(result).toBeDefined();
});

it.skip("Should delete all templates", async () => {
  const result = await boards.deleteAll();

  console.log(result);
  expect(result).toBeDefined();
});
