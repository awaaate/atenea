import { z } from "zod";
import { gql } from "graphql-request"
import { nounsSubgraph } from "../../../lib/nouns-subgraph";
import { Proposal, ProposalMeta, ProposalStatus } from "./types";
import { bigint } from "drizzle-orm/mysql-core";

import DATA from "./extra-data.json"


export const input = z.object({
  idIn: z.array(z.string()).optional(),
  first: z.number().int().positive().optional(),
  skip: z.number().int().positive().optional(),
  createdTimestamp: z.number().int().positive().optional(),
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
    totalSupply
    quorumCoefficient
    minQuorumVotesBPS
    maxQuorumVotesBPS
    totalSupply
    status
    createdTimestamp
    startBlock
    endBlock
    proposer {
       id
       nounsRepresented {
         id
       }
       
    }
  }
 
}

`

const INFURA_API_URL = `https://mainnet.infura.io/v3/1b110eaa799744179ea12b0441c386ba`;
async function getCurrentBlockNumber(): Promise<number | null> {
  try {
    const response = await fetch(INFURA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    });

    const data = await response.json();

    if (data.result) {
      const blockNumberHex = data.result;
      const blockNumber = parseInt(blockNumberHex, 16); // Convert from hexadecimal to decimal
      return blockNumber;
    } else {
      throw new Error('Unable to retrieve block number');
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getProposalMeta = async (inputVariables: z.infer<typeof input>) => {
  const currentBlock = await getCurrentBlockNumber();
  if (!currentBlock) throw new Error('Unable to retrieve current block number')

  const { status, ...args } = inputVariables
  let variables;
  if (status === 'ACTIVE') {
    variables = {
      ...args,
      where: {
        endBlock_gte: currentBlock,
        startBlock_lte: currentBlock + 100000
      },
      orderBy: "endBlock",
      orderDirection: "asc",
    }
  } else {
    variables = {
      ...args,
      where: {
        propposer: args.proposer,
        status: status,
        description_contains_nocase: args.descriptionContains,
        title_contains_nocase: args.titleContains,
        id_in: args.idIn,
        createdTimestamp_gte: args.createdTimestamp,
      },
    }
  }
  const data = await nounsSubgraph.request<{
    proposals: ProposalMeta[]
  }>(query, variables
  )


  const finalData = data.proposals.map((proposal) => {

    const rawData = {
      startBlock: parseInt(proposal.startBlock),
      endBlock: parseInt(proposal.endBlock),
      forVotes: parseInt(proposal.forVotes),
      againstVotes: parseInt(proposal.againstVotes),
      abstainVotes: parseInt(proposal.abstainVotes),
      quorumVotes: parseInt(proposal.quorumVotes),
      totalSupply: parseInt(proposal.totalSupply),
      quorumCoefficient: parseInt(proposal.quorumCoefficient),
      minQuorumVotesBPS: parseInt(proposal.minQuorumVotesBPS),
      maxQuorumVotesBPS: parseInt(proposal.maxQuorumVotesBPS),
      createdTimestamp: new Date(parseInt(proposal.createdTimestamp) * 1000),
      id: proposal.id,
      nounId: proposal.proposer.nounsRepresented[0] ? parseInt(proposal.proposer.nounsRepresented[0].id) : null,
      targets: proposal.targets,
      values: proposal.values.map((value) => parseInt(value)),
      title: proposal.title,
      status: proposal.status as ProposalStatus,


    }
    const dynamicQuorum = computeProposalQuorumVotes(rawData);


    return {
      ...rawData,
      dynamicQuorum,
      ...getProposalsDates(currentBlock, dynamicQuorum, rawData)
    }
  })

  return finalData.map(data => {
    const extraData = DATA.find((d: any) => d.No == data.id)
    if (!extraData) {
      console.log("NO EXTRA DATA", data.id)
      return {
        ...data,
        categories: ["Uncategorized"],
        totalBudget: Number((data.values.reduce((acc, curr) => acc + curr, 0) / 1e18).toFixed(2)),
      }
    }
    return {
      ...data,
      categories: extraData ? extraData.Category.split(",") : [] as string[],
      totalBudget: extraData ? Number(Number(extraData?.ETH || "0").toFixed(2)) : 0,
    }
  })
}

export const deriveProposalStatus = (
  currentBlock: number,
  dynamicQuorum: number,
  proposal: Proposal
): ProposalStatus => {
  // Calculate the dynamic quorum
  if (proposal.status as any === "CANCELLED") {
    return ProposalStatus.Cancelled;
  } else if (currentBlock < proposal.startBlock) {
    return ProposalStatus.Pending;
  } else if (
    currentBlock >= proposal.startBlock &&
    currentBlock <= proposal.endBlock
  ) {
    return ProposalStatus.Voting;
  } else if (currentBlock > proposal.endBlock) {
    if (
      proposal.forVotes >= dynamicQuorum &&
      proposal.forVotes > proposal.againstVotes
    ) {
      return ProposalStatus.Succeeded;
    } else {
      return ProposalStatus.Defeated;
    }
  } else {
    throw new Error('Unable to determine proposal status');
  }
};
export const computeProposalQuorumVotes = (proposal: Proposal): number => {
  const againstVotesBPS =
    (10000 * proposal.againstVotes) / proposal.totalSupply;
  const quorumAdjustmentBPS =
    (proposal.quorumCoefficient * againstVotesBPS) / 1e6;
  const adjustedQuorumBPS = proposal.minQuorumVotesBPS + quorumAdjustmentBPS;
  const dynamicQuorumBPS = Math.min(
    proposal.maxQuorumVotesBPS,
    adjustedQuorumBPS
  );
  return (dynamicQuorumBPS * proposal.totalSupply) / 10000;
};
export const getProposalsDates = (
  currentBlock: number,
  dynamicQuorum: number,
  proposal: Proposal
): { status: ProposalStatus; endsAt: Date; startsAt: Date } => {
  const { startBlock, endBlock } = proposal;


  const blockDuration = 12; // seconds per block
  const now = new Date();
  const endsAt = new Date(now.getTime() + (endBlock - currentBlock) * blockDuration * 1000);
  const startsAt = new Date(now.getTime() + (startBlock - currentBlock) * blockDuration * 1000);

  const status = deriveProposalStatus(currentBlock, dynamicQuorum, proposal);
  if (status === ProposalStatus.Pending) {
    return { status: ProposalStatus.Pending, endsAt, startsAt };
  } else if (status === ProposalStatus.Voting) {
    return { status: ProposalStatus.Voting, endsAt, startsAt };
  } else if (status === ProposalStatus.Cancelled) {
    return { status: ProposalStatus.Cancelled, endsAt, startsAt };
  } else if (status === ProposalStatus.Defeated) {
    return { status: ProposalStatus.Defeated, endsAt, startsAt };
  } else if (status === ProposalStatus.Succeeded) {
    return { status: ProposalStatus.Succeeded, endsAt, startsAt };
  } else {
    return { status: "Qued", endsAt, startsAt };
  }
};