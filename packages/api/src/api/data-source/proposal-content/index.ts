import { gql } from "graphql-request";
import { ateneaGraph } from "../../../lib/atenea-graph"
import { nounsSubgraph } from "../../../lib/nouns-subgraph"
import { GetProposalContent, GetProposalDescriptionAndTitle } from "./types";


const contentQuery = gql`
    query Proposal($proposalId: ID!) {
  proposal(id: $proposalId) {
    title
    description
  }
}

`

const descriptionQuery = gql`
query ProposalCollection($filter: ProposalFilter) {
  proposalCollection(filter: $filter) {
    edges {
      node {
        title
        description
      }
    }
  }
}
`

export const getProposalContent = async (proposalId: number) => {
  const ateneaData = await ateneaGraph.request<GetProposalDescriptionAndTitle>(descriptionQuery, {
    "filter": {
      "id": {
        "eq": proposalId
      }
    }
  })
  const nounsData = await nounsSubgraph.request<GetProposalContent>(contentQuery, {
    "proposalId": proposalId
  })

  return {
    content: nounsData.proposal.description,
    description: ateneaData.proposalCollection.edges[0].node.description,
    title: ateneaData.proposalCollection.edges[0].node.title,
  }
}