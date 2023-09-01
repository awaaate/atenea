import "dotenv/config"
import { it, expect } from "vitest"
import { workspaceRouter } from "./workspace"

import { db } from "@shared/db"

const workspaces = workspaceRouter.createCaller({
    db,
    user: {
        id: "cll5fq2so0000fv81s8w841ot",
    },
})
it.skip("It should get a workspace", async () => {
    //test the trpc

    const result = await workspaces.getWorkspaceBoards({
        id: "cll7sfwmp0000fvqa83xdcnsu",
    })

    console.log(result)
    expect(result).toBeDefined()
})



it.skip("It should create a workspace", async () => {
    //test the trpc

    const result = await workspaces.createWorkspace({
        name: "Hello",
        description: "Hello",
        subdomain: "Hello",
        accentColor: "Hello",
        image: "Hello",
    })

    console.log(result)
    expect(result).toBeDefined()
})

it.skip("Get all the workspaces from the user", async () => {
    //test the trpc

    const result = await workspaces.getUserWorkspaces()

    console.log(result)
    expect(result).toBeDefined()
})