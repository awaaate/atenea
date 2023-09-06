

export interface GetProposalBudget {
    budgetSectionCollection: BudgetSectionCollection
}

export interface BudgetSectionCollection {
    edges: Edge[]
}

export interface Edge {
    node: Node
}

export interface Node {
    name: string
    amount: number
    description: string
    id: number
}
