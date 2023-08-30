import { it } from "vitest";
import { getUniqueProposal } from "./getUniqueProposal";
import { updateProposal } from "./updateProposal";


it.skip("Should get a proposal ", async () => {
    const proposal = await getUniqueProposal(275)



    console.log(proposal)
});

//

it("Should update a proposal with a category", async () => {
    const proposal = await getUniqueProposal(276)

    console.log(proposal)


    // const proposalAfter = await getUniqueProposal(275)


    // console.log(proposalAfter)
});