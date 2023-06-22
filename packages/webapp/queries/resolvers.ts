import { Resolvers } from "../.graphclient"

// @TODO remove custom Nouns resolvers
const resolvers: Resolvers = {
  Query: {
    proposals: async (root, args, context, info) =>
      await context.gnars.Query.proposals({ root, args, context, info }),
    proposal: async (root, args, context, info) =>
      await context.gnars.Query.proposal({ root, args, context, info }),
    auctions: async (root, args, context, info) =>
      // @ts-ignore
      await context.gnars.Query.auctions({ root, args, context, info }),
    _meta: async (root, args, context, info) =>
      await context.gnars.Query._meta({ root, args, context, info }),
    delegate: async (root, args, context, info) =>
      await context.gnars.Query.delegate({ root, args, context, info }),
    account: async (root, args, context, info) =>
      await context.gnars.Query.account({ root, args, context, info }),
  },
}

export default resolvers
