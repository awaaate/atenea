
export interface GetRoadmapSections {
    roadmapSectionCollection: RoadmapSectionCollection
}

export interface RoadmapSectionCollection {
    edges: Edge[]
}

export interface Edge {
    node: Node
}

export interface Node {
    id: number
    name: string
    proposalId: number
    description: string
}
