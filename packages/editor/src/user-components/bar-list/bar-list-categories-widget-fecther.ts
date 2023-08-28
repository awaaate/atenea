import { gql } from "graphql-request";
import { ateneaFetcher, getProposalsIdsFromCategory } from "../../lib/clients";

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
        budgetTotal
      }
    }
  }
}

`


const Categories = [
    "Art",
    "Arts ",
    "Charity",
    "Community",
    "Droposal",
    "Marketing",
    "Operational",
    "Staking/Yield",
    "Tech",
    "Other"
]

export const getProposalsByIds = (ids: number[]) => {
    return ateneaFetcher<Data>(query,
        {
            "filter": {
                "id": {
                    "in": ids
                }
            }
        })
}


export const getCategoriesProposals = () => async () => {
    const data: {
        name: string
        value: number
    }[] = []
    for (const category of Categories) {
        const ids = await getProposalsIdsFromCategory(category)

        const result = await getProposalsByIds(ids)
        console.log({
            category, ids, result
        })
        const value = result.proposalCollection.edges.reduce((acc, edge) => {

            return acc + edge.node.budgetTotal
        }, 0)


        data.push({
            name: category,
            value
        })

    }
    console.log(data)
    return data.sort((a, b) => b.value - a.value)
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
    budgetTotal: number
}
