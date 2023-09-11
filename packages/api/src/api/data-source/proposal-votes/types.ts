
export interface GetProposalVotes {
    votes: Vote[]
}

export interface Vote {
    id: string
    support: boolean
    supportDetailed: number
    votes: string
    reason?: string
    voter: Voter
    proposal: Proposal
    blockNumber: string
}

export interface Voter {
    id: string
}

export interface Proposal {
    id: string
    title: string
}

