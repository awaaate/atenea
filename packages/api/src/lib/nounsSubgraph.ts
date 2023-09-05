import { GraphQLClient } from "graphql-request";

export const nounsSubgraph = new GraphQLClient(
    "https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/0.2.0/gn",
    {
        fetch,
    }
)