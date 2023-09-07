export interface GetTeamMembers {
    proposal_to_team_memberCollection: ProposalToTeamMemberCollection
}

export interface ProposalToTeamMemberCollection {
    edges: Edge[]
}

export interface Edge {
    node: Node
}

export interface Node {
    teamMember: TeamMember
}

export interface TeamMember {
    name: string
    what: string
    socialHandles: string
    walletAddress: string
}
