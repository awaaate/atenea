import "dotenv/config"
import { it, expect } from "vitest"
import { boardsRouter } from "./boards"

import { db } from "@shared/db"

const boards = boardsRouter.createCaller({
    db,
    user: {
        id: "cll5fq2so0000fv81s8w841ot",
    },
})

it.skip("Should get unique board", async () => {
    const result = await boards.getSiblingBoards({
        id: "cll8ww7s50001fvl58d8qx4b3",
    })

    console.log(result)
    expect(result).toBeDefined()
})


it.skip("It should get all the board from the user", async () => {
    //test the trpc

    const result = await boards.getAll()

    console.log(result)
    expect(result).toBeDefined()
})


it.skip("It should set the draft", async () => {
    //test the trpc

    const result = await boards.setDraft({
        id: "cll8ww7s50001fvl58d8qx4b3",
        name: "Hello",
        accentColor: "Hello",
        background: "Hello",
        draft: {
            nodes: []
        }
    })

    console.log(result)
    expect(result).toBeDefined()
})

it.skip("Should publish the board", async () => {
    const result = await boards.publish({
        id: "cll8ww7s50001fvl58d8qx4b3",
        currentContent: {
            nodes: []
        }
    })

    console.log(result)
    expect(result).toBeDefined()
})

it.skip("Should get the board", async () => {
    const result = await boards.get({
        id: "cll8ww7s50001fvl58d8qx4b3",
    })

    console.log(result)
    expect(result).toBeDefined()
}) 