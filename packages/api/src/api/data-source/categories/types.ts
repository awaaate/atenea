

export interface GetAllCategories {
    category_to_proposalCollection: CategoryToProposalCollection
}

export interface CategoryToProposalCollection {
    edges: Edge[]
    pageInfo: PageInfo
}

export interface Edge {
    node: Node
}

export interface Node {
    proposal: Proposal
    category_name: string
}

export interface Proposal {
    id: number
    budgetTotal: number
}


export interface PageInfo {
    endCursor: string
    hasNextPage: boolean
    startCursor: string
}
