import { gql } from "graphql-request"
import { ateneaGraph } from "../../../lib/atenea-graph"
import { GetProposalBudget } from "./types"

const query = gql`
query BudgetSectionCollection($filter: BudgetSectionFilter) {
  budgetSectionCollection(filter: $filter) {
    edges {
      node {
        amount
        description
        name
        id
      }
    }
  }
}
`


export const getBudgetSections = async (id: number) => {
  const variables = {
    "filter": {
      "proposalId": {
        "in": [id]
      }
    }
  }

  const data = await ateneaGraph.request<GetProposalBudget>(query, variables)

  return data.budgetSectionCollection.edges.map(({ node },) => ({
    amount: node.amount,
    description: node.description,
    name: node.name,
    id: node.id
  }))
}