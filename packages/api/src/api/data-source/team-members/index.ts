import { gql } from "graphql-request";
import { ateneaGraph } from "../../../lib/atenea-graph";
import { GetTeamMembers } from "./types";
const query = gql`
  query ProposalTeam($filter: proposal_to_team_memberFilter) {
    proposal_to_team_memberCollection(filter: $filter) {
      edges {
        node {
          teamMember {
            name
            what
            walletAddress
            socialHandles
          }
        }
      }
    }
  }
`;

export const getProposalTeamMembers = async (id: number) => {
  const data = await ateneaGraph.request<GetTeamMembers>(query, {
    filter: {
      propposal_id: {
        in: [id],
      },
    },
  });

  const parsedData = data.proposal_to_team_memberCollection.edges.map(
    ({ node }) => {
      const data = {
        name: node.teamMember.name,
        what: node.teamMember.what,
        walletAddress: node.teamMember.walletAddress,
        socialHandles:
          (JSON.parse(node.teamMember.socialHandles) as {
            name: string;
            url: string;
          }[]) || [],
      };

      if (typeof data.socialHandles === "string") {
        data.socialHandles = JSON.parse(data.socialHandles);
      }
      return data;
    }
  );

  return parsedData;
};
