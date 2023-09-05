import { z } from "zod";
import { gql } from "graphql-request"
export const input = z.object({
    first: z.number().int().positive().optional(),
    skip: z.number().int().positive().optional(),
    orderBy: z
        .enum([
            'createdTimestamp',
            'votes',
            'forVotes',
            'againstVotes',
            'id',
            'abstainVotes',
            'quorumVotes',
            'status',
        ])
        .optional(),
    orderDirection: z.enum(['asc', 'desc']).optional(),
    status: z

        .enum([
            'PENDING',
            'ACTIVE',
            'CANCELLED',
            'VETOED',
            'QUEUED',
            'EXECUTED',
        ])
        .optional(),
    proposer: z.string().optional(),
    titleContains: z
        .string()
        .optional()
        .describe('Searches for a text match in the title of the proposal'),
    descriptionContains: z
        .string()
        .optional()
        .describe(
            'Searches for a text match in the description of the proposal'
        ),
})



export const query = gql`
query proposals(
  $skip: Int
  $first: Int
  $orderBy: Proposal_orderBy
  $orderDirection: OrderDirection
  $where: Proposal_filter
  $block: Block_height

) {
  proposals(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    targets
    values
    quorumVotes
    forVotes
    againstVotes
    abstainVotes
    title
    status
    createdTimestamp
    proposer {
       id
    }
  }
}

`