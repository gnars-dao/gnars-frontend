import { CHAIN_IDS } from "@constants";
import { Resolvers } from "@subgraph-generated/layer-1";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@subgraph-generated/base";

export const resolvers: Resolvers = {
  Query: {
    proposals: async (root, args, context, info) => await context.gnars.Query.proposals({ root, args, context, info }),
    proposal: async (root, args, context, info) => await context.gnars.Query.proposal({ root, args, context, info }),
    auctions: async (root, args, context, info) => await context.gnars.Query.auctions({ root, args, context, info }),
    _meta: async (root, args, context, info) => await context.gnars.Query._meta({ root, args, context, info }),
    delegate: async (root, args, context, info) => await context.gnars.Query.delegate({ root, args, context, info }),
    account: async (root, args, context, info) => await context.gnars.Query.account({ root, args, context, info })
  }
};

// Base client singleton
const globalBaseClient = global as unknown as {
  subgraphClient: Map<CHAIN_IDS, GraphQLClient>;
};

// import this class and instantiate it to connect to the subgraph and query
export class BaseSDK {
  static connect() {
    if (!globalBaseClient?.subgraphClient) {
      globalBaseClient.subgraphClient = new Map();
    }

    const chainId = CHAIN_IDS.BASE;

    let client: GraphQLClient;

    if (globalBaseClient.subgraphClient.has(chainId)) {
      client = globalBaseClient.subgraphClient.get(chainId) as GraphQLClient;
    } else {
      client = new GraphQLClient(process.env.NEXT_PUBLIC_GOLDSKY_BASE_API_URL as string, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    globalBaseClient.subgraphClient.set(chainId, client);

    return getSdk(client);
  }
}
