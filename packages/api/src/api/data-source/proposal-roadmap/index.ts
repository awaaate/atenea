import { gql } from "graphql-request";
import { ateneaGraph } from "../../../lib/atenea-graph"
import { GetRoadmapSections } from "./types";
const query = gql`
query Node($filter: RoadmapSectionFilter, $orderBy: [RoadmapSectionOrderBy!]) {
  roadmapSectionCollection(filter: $filter, orderBy: $orderBy) {
    edges {
      node {
        name
        description
        id
        proposalId
      }
    }
  }
}

`

export const getProposalRoadmap = async (id: number) => {
  const data = await ateneaGraph.request<GetRoadmapSections>(query,
    {
      "filter": {
        "proposalId": {
          "in": [id]
        }
      },
      "orderBy": [
        {
          "id": "AscNullsLast"
        }
      ]
    }
  )

  return data.roadmapSectionCollection.edges.map(({ node }) => ({
    id: node.id,
    name: node.name,
    description: node.description,
  }))

}