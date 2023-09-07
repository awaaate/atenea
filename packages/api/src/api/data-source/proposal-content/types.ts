
export interface GetProposalDescriptionAndTitle {
    proposalCollection: ProposalCollection
}

export interface ProposalCollection {
    edges: Edge[]
}

export interface Edge {
    node: Node
}
export interface Node {
    title: string
    description: string
}
export interface GetProposalContent {
    proposal: Proposal
}

export interface Proposal {
    title: string
    description: string
}
export interface Root {
    data: Data
}

export interface Data {
    proposal: Proposal
}

export interface Proposal {
    title: string
    description: string
}
