import { it } from "vitest"
import { dataSourceRouter } from "./data-source"
import { db } from "@shared/db"

const caller = dataSourceRouter.createCaller({ user: null, })

it("Should get the proposal meta", async () => {
    const data = await caller.proposalsMeta({ first: 20, orderBy: "createdTimestamp", orderDirection: "desc" })
    console.log(data)
    return data
})