export interface ProposalMeta {
    id: string
    targets: string[]
    values: string[]
    quorumVotes: string
    forVotes: string
    againstVotes: string
    abstainVotes: string
    title: string
    status: string
    createdTimestamp: string
    proposer: Proposer
}

export interface Proposer {
    id: string
}
