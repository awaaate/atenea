import { GraphQLClient } from "graphql-request";

export const ateneaGraph = new GraphQLClient(
    "https://qefwetfuanuvdqtubjpw.supabase.co/graphql/v1",
    {
        fetch,
        headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZndldGZ1YW51dmRxdHVianB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyOTY4MDIsImV4cCI6MjAwODg3MjgwMn0.MG0rnDYTwPSEt95eP4Ni2WNJvhlMCJ4OtdM6W4XfwfI",
            "Content-Type": "application/json",
        }
    }
)

