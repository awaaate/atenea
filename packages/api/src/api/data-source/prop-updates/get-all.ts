import { gql } from "graphql-request";
import { propUpdatesClient } from "./client";

export interface GetAllQuery {
  propUpdates: PropUpdate[];
}

export interface PropUpdate {
  id: string;
  admin: string;
  prop: Prop;
  isCompleted: boolean;
  update: string;
  transactionHash: string;
  blockTimestamp: string;
  __typename: string;
}

export interface Prop {
  id: string;
  proposer: string;
  title: string;
  __typename: string;
}

const query = gql`
  query allUpdates {
    propUpdates(orderBy: blockNumber, orderDirection: desc) {
      id
      admin
      prop {
        id
        proposer
        title
        __typename
      }
      isCompleted
      update
      transactionHash
      blockTimestamp
      __typename
    }
  }
`;

export const getAllPropUpdates = async () => {
  const data = await propUpdatesClient.request<GetAllQuery>(query);
  return data.propUpdates.map((update) => {
    return {
      ...update,
      date: new Date(parseInt(update.blockTimestamp) * 1000).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    }
  })
};
