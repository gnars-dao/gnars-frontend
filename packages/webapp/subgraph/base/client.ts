import { GraphQLClient } from "graphql-request"
import { CHAIN_IDS } from "constants/types"
import { getSdk } from "./index.ts"

const globalForClient = global as unknown as {
  subgraphClient: Map<CHAIN_IDS, GraphQLClient>
}

export class SDK {
  static connect(chainId: CHAIN_IDS) {
    if (!globalForClient.subgraphClient) globalForClient.subgraphClient = new Map()

    const client = globalForClient.subgraphClient.has(chainId)
      ? globalForClient.subgraphClient.get(chainId)!
      : new GraphQLClient(CHAIN_IDS.BASE, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })

    if (process.env.NODE_ENV !== "production") globalForClient.subgraphClient.set(chainId, client)

    return getSdk(client)
  }
}
