import { Resolvers } from "../subgraph/layer-1"
import { PUBLIC_SUBGRAPH_URL } from "constants/subgraph"
import { CHAIN_IDS } from "constants/chainId"
import { getSdk } from "./../subgraph/base/index.ts"
import { GraphQLClient } from "graphql-request"

export const layerOneResolvers: Resolvers = {
  Query: {
    proposals: async (root, args, context, info) => await context.gnars.Query.proposals({ root, args, context, info }),
    proposal: async (root, args, context, info) => await context.gnars.Query.proposal({ root, args, context, info }),
    auctions: async (root, args, context, info) =>
      // @ts-ignore
      await context.gnars.Query.auctions({ root, args, context, info }),
    _meta: async (root, args, context, info) => await context.gnars.Query._meta({ root, args, context, info }),
    delegate: async (root, args, context, info) => await context.gnars.Query.delegate({ root, args, context, info }),
    account: async (root, args, context, info) => await context.gnars.Query.account({ root, args, context, info })
  }
}

// Base client singleton
const globalBaseClient = global as unknown as {
  subgraphClient: Map<CHAIN_IDS, GraphQLClient>
}

// import this class and instantiate it to connect to the subgraph and query
export class BaseSDK {
  static connect() {
    if (!globalBaseClient.subgraphClient) {
      globalBaseClient.subgraphClient = new Map()
    }

    const chainId = process.env.NEXT_PUBLIC_NETWORK_TYPE === "mainnet" ? CHAIN_IDS.BASE : CHAIN_IDS.BASE_SEPOLIA

    const client = globalBaseClient.subgraphClient.has(chainId)
      ? globalBaseClient.subgraphClient.get(chainId)!
      : new GraphQLClient(PUBLIC_SUBGRAPH_URL[chainId], {
          headers: {
            "Content-Type": "application/json"
          }
        })

    globalBaseClient.subgraphClient.set(chainId, client)

    return getSdk(client)
  }
}
