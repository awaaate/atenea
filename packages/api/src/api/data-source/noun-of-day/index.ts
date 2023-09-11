import { gql } from 'graphql-request'
import { nounsSubgraph } from '../../../lib/nouns-subgraph'

const query = gql`
{
  auctions(orderBy: startTime, orderDirection: desc, first: 1) {
    id
    amount
    settled
    bidder {
      id
      __typename
    }
    startTime
    endTime
    noun {
      id
      owner {
        id
        __typename
      }
      __typename
    }
    bids {
      id
      amount
      blockNumber
      blockTimestamp
      txIndex
      bidder {
        id
        __typename
      }
      __typename
    }
    __typename
  }
}

`



export interface GetAuctionsQuery {
    auctions: Auction[]
}

export interface Auction {
    id: string
    amount: string
    settled: boolean
    bidder: Bidder
    startTime: string
    endTime: string
    noun: Noun
    bids: Bid[]
    __typename: string
}

export interface Bidder {
    id: string
    __typename: string
}

export interface Noun {
    id: string
    owner: Owner
    __typename: string
}

export interface Owner {
    id: string
    __typename: string
}

export interface Bid {
    id: string
    amount: string
    blockNumber: string
    blockTimestamp: string
    txIndex: string
    bidder: Bidder2
    __typename: string
}

export interface Bidder2 {
    id: string
    __typename: string
}


export const getNounOfTheDay = async () => {
    const noun = await nounsSubgraph.request<GetAuctionsQuery>(query)
    return {
        endTime: new Date(parseInt(noun.auctions[0].endTime) * 1000),
        nounId: parseInt(noun.auctions[0].noun.id),
        currentBid: parseInt(noun.auctions[0].amount) / Math.pow(10, 18),
    }
}