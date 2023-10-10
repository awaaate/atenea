import { gql } from "graphql-request";
import { propUpdatesClient } from "./client";

const query = gql`
  query getPropUpdate($where: Proposal_filter) {
    proposals(where: $where) {
      id
      title
      proposer
      admin
      executed
      isCompleted
      updates {
        id
        isCompleted
        blockTimestamp
        update
        admin
      }
      __typename
    }
  }
`;

export interface GetPropUpdates {
  proposals: Proposal[];
}

export interface Proposal {
  id: string;
  title: string;
  proposer: string;
  admin: string;
  executed: boolean;
  isCompleted: boolean;
  updates: Update[];
  __typename: string;
}

export interface Update {
  id: string;
  update: string;
  isCompleted: boolean;
  admin: string;
  blockTimestamp: string;
}

export const getPropUpdates = async (ids: string[]) => {
  const data = await propUpdatesClient.request<GetPropUpdates>(query, {
    where: {
      id_in: ids,
    },
  });
  return data.proposals.map((proposal) => {
    return {
      ...proposal,
      updates: proposal.updates.map((update) => {
        return {
          ...update,
          date: new Date(parseInt(update.blockTimestamp) * 1000).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          ),
        };
      }),
    };
  });
};
