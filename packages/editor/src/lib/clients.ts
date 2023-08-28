import { type SupabaseClient, createClient } from '@supabase/supabase-js'
/* eslint-disable no-undef */
import { GraphQLClient } from 'graphql-request'
//import { safeEnvVars } from '../safeEnvVars'

export const nounsClient = new GraphQLClient(
    'https://api.goldsky.com/api/public/project_cldf2o9pqagp43svvbk5u3kmo/subgraphs/nouns/0.1.0/gn',
    {
        fetch,
    }
)
export const ateneaClient = new GraphQLClient(
    "https://vgsfluwfkcmjzgpsibum.supabase.co/graphql/v1",

    {
        fetch,
        headers: {
            //TODO: move to env
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2ZsdXdma2NtanpncHNpYnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4MjM4NTQsImV4cCI6MjAwNjM5OTg1NH0.aBYKke94N6_geXwHT_PyrMMysGL66aTxYf3MWrog_GE",//safeEnvVars("SUPABASE_ANON_KEY"),
            "Content-Type": "application/json",
        },
    }
)


export const ateneaFetcher = async <T>(query: string, variables: any) => {
    const res = await ateneaClient.request<T>(query, variables)
    return res
}



// Create a single supabase client for interacting with your database


let client: SupabaseClient | null = null
export const dbEdge = () => {

    if (!client) {
        client = createClient("https://vgsfluwfkcmjzgpsibum.supabase.co" || "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2ZsdXdma2NtanpncHNpYnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4MjM4NTQsImV4cCI6MjAwNjM5OTg1NH0.aBYKke94N6_geXwHT_PyrMMysGL66aTxYf3MWrog_GE" || "")
        return client
    }
    return client
}


export const getProposalIdsFromTeamMeber = async (name: string) => {
    const ids = await dbEdge().from("_ProposalToTeamMember").select("*").ilike("B", name.trim())
    if (!ids.data) return []
    return ids.data.map((id: any) => id.A)
}

export const getTeamMembersFromProposalId = async (id: string | number) => {
    const response = await dbEdge().from("_ProposalToTeamMember").select(`
    B (
     *,
     SocialHandle (
      *
     )
    )
  
  `).eq("A", id)
    return response.data as unknown
}


export const getProposalsIdsFromCategory = async (category: string) => {
    const ids = await dbEdge().from("_CategoryToProposal").select("*").eq("A", category)
    if (!ids.data) return []
    return ids.data.map((id: any) => id.B)
}

export const getCategoriesFromProposalId = async (proposalId: string | number) => {
    const response = await dbEdge().from("_CategoryToProposal").select(`
   A (
    *
   )
  `).eq("B", proposalId)
    if (!response.data) return []
    return response.data.map((id: any) => id.A.name)
}
