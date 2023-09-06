import { gql } from "graphql-request";
import { ateneaGraph } from "../../../lib/atenea-graph";
import { Edge, GetAllCategories } from "./types";

export const query = gql`
query GetAllCategories($first: Int, $before: Cursor, $after: Cursor) {
  category_to_proposalCollection(first: $first, before: $before, after: $after) {
    edges {
      node {
        category_name
        proposal {
          budgetTotal
          id
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
  }
}
`

export const fecthAllCategories = async () => {
    let hasNextPage = true
    let after: string | null = null
    let categories: Edge[] = []

    while (hasNextPage) {
        const data = await ateneaGraph.request<GetAllCategories>(query, {
            first: 100,
            after
        })

        const { edges, pageInfo } = data.category_to_proposalCollection

        categories = [...categories, ...edges]

        hasNextPage = pageInfo.hasNextPage
        after = pageInfo.endCursor
    }
    return categories
}
