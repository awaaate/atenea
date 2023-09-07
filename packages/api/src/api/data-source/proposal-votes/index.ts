import { gql } from "graphql-request";
import { nounsSubgraph } from "../../../lib/nouns-subgraph"
import { GetProposalVotes } from "./types";


const query = gql`
query GetVotesForProposal(
  $proposalId: String!
  $order: OrderDirection
  $limit: Int
  $offset: Int
) {
  votes(
    where: { proposal: $proposalId }
    orderBy: blockNumber
    orderDirection: $order
    first: $limit
    skip: $offset
  ) {
id
  support
  supportDetailed
  votes
  reason
  voter {
    id
  }
  proposal {
    id
    title
  }
  blockNumber
  }
}

`

export const getProposalVotes = async (proposalId: number) => {
    const data = await nounsSubgraph.request<GetProposalVotes>(query, {
        proposalId: proposalId.toString(),
    })
    return data.votes
};