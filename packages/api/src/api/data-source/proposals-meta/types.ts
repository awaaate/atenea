export interface Proposal {
    id: string
    targets: string[]
    values: number[]
    quorumVotes: number
    forVotes: number
    againstVotes: number
    abstainVotes: number
    title: string
    createdTimestamp: Date
    startBlock: number
    endBlock: number
    totalSupply: number
    quorumCoefficient: number
    minQuorumVotesBPS: number
    maxQuorumVotesBPS: number
    status: ProposalStatus
    nounId: number | null
}

export enum ProposalStatus {
    Pending = 'Pending',
    Voting = 'Voting',
    Succeeded = 'Succeeded',
    Defeated = 'Defeated',
    Cancelled = 'Cancelled',
}

export interface ProposalMeta {
    id: string
    targets: string[]
    values: string[]
    quorumVotes: string
    forVotes: string
    againstVotes: string
    abstainVotes: string
    title: string
    totalSupply: string
    quorumCoefficient: string
    minQuorumVotesBPS: string
    maxQuorumVotesBPS: string
    status: string
    createdTimestamp: string
    startBlock: string
    endBlock: string
    proposer: Proposer
}

export interface Proposer {
    id: string
    nounsRepresented: NounsRepresented[]
}

export interface NounsRepresented {
    id: string
}
export interface ProposalData {
    No: string
    Name: string
    ETH: string
    USDC: string
    "Total prop value": string
    "True cost": string
    Nouns: string
    "Has extra ETH": string
    Category: string
    Voting: string
    Status: string
    Team: string
    Product: string
    "Discussion links": string
    "Press/media/social links": string
    "Comments / issues": string
    Date: string
    "Extra ETH returned": string
    Leftover: string
}
