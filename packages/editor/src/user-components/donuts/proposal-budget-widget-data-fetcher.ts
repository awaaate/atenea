import { gql } from "graphql-request";
import { ateneaFetcher } from "../../lib/clients";

export const query = gql`


query Proposals(
  $filter: ProposalFilter
  $first: Int
  $orderBy: [ProposalOrderBy!]
) {
  proposalCollection(filter: $filter, first: $first, orderBy: $orderBy) {
    edges {
      node {
        id
        budgetSectionCollection {
          edges {
            node {
              name
              description
              amount
            }
          }
        }
      }
    }
  }
}

`

export const getProposalBudget = (id: number) => () => {
  return ateneaFetcher<Data>(query,
    {
      "filter": {
        "id": {
          "eq": id
        }
      }
    })
}


export interface Data {
  proposalCollection: ProposalCollection
}

export interface ProposalCollection {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  id: number
  budgetSectionCollection: BudgetSectionCollection
}

export interface BudgetSectionCollection {
  edges: Edge2[]
}

export interface Edge2 {
  node: Node2
}

export interface Node2 {
  name: string
  amount: number
  description: string
}
