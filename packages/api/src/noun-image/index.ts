import { gql } from "graphql-request";
import { nounsSubgraph } from "../lib/nouns-subgraph"
import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData;



const query = gql`
query NounSeed($nounId: ID!) {
  noun(id: $nounId) {
    seed {
      accessory
      background
      body
      glasses
      head
    }
  }
}

`


export interface NounSeedQUery {
  noun: Noun
}

export interface Noun {
  seed: Seed
}

export interface Seed {
  accessory: string
  background: string
  body: string
  glasses: string
  head: string
}

export const generateNounImage = async (nounId: string) => {
  const response = await nounsSubgraph.request<NounSeedQUery>(query, {
    nounId
  })
  const seed = response.noun.seed

  const { parts, background } = getNounData({
    background: parseInt(seed.background),
    body: parseInt(seed.body),
    accessory: parseInt(seed.accessory),
    head: parseInt(seed.head),
    glasses: parseInt(seed.glasses),
  });



  const svgBinary = buildSVG(parts, palette, background);


  return svgBinary
}