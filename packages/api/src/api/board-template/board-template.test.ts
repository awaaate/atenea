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

it.skip("Should create a template", async () => {
  const result = await boards.create({
    name: "Test",
    description: "Test",
    image: "Test",
    boardId: "xE60hq5unXtf-vpfMb1-f",
  });

  console.log(result);
  expect(result).toBeDefined();
});

it.skip("Should get all templates", async () => {
  const result = await boards.getAll();

  console.log(result);
  expect(result).toBeDefined();
});

it("Should delete all templates", async () => {
  const result = await boards.deleteAll();

  console.log(result);
  expect(result).toBeDefined();
});
