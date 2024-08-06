# Gnars webapp

## Getting started

1. Install dependencies
```
pnpm i
```

2. Copy `.env.example` to a new personal `.env` file and fill in ALL the missing values with your personal keys so we don't rate limit each other:
```
# RPC API KEYS
NEXT_PUBLIC_ALCHEMY_API_KEY=YsaXbtaz1XXXXXXXXW2mADNtnHGLqwT

# Block Explorer API KEYS
NEXT_PUBLIC_ETHERSCAN_API_KEY=544JSDXXXXXXXXXXXXXXXXXXXXC7EUYMS
NEXT_PUBLIC_BASESCAN_API_KEY=NMJ4FUEV3XXXXXXXXXXXXXXXXVBWWY28Z6

NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=36fa892eXXXXX24c6dbf3bd572c9f

# values are 'mainnet' or 'testnet'
NEXT_PUBLIC_NETWORK_TYPE=mainnet
```

3. Run the dev server (automatically runs the predev as well to generate the latest schema so you are always up to date with any changes)
```
pnpm dev
```
## Subgraph Queries

This project
uses [The Goldsky Client](https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn)
to interact with the Gnars subgraph in a type-safe way

4. Add all new BASE queries/fragments/and requests to `packages/webapp/queries/base/**/*`.

5. I modeled the new resolver for Gnars BASE after the Builder team's approach. You can look in their codebase for unlimited examples.  
- After you have created a new Graphql , and you have tested it out on the Goldsky UI explorer, add it to the the queries directory and run `pnpm codegen` to update the new schema changes locally`.
- Assuming `graphql-codegen` ran successfully, you should now be able to access it programmatically by `import`ing the `BaseSDK` client from `packages/webapp/queries/resolvers.ts`. It will create a singleton if connection to GoldSky if it doesn't already exist,  
    but regardless you still need to call `connect()` on the class every time you want to use it. As an example step 1) `import { BaseSDK } from "queries/resolvers"` in a new request file like: `packages/webapp/queries/base/requests/auctionHistory.ts`  
    Step 3) If your new query was for `auctionHistory`, for example, you would now be able to query it in the request file like this:  

```
const data = await BaseSDK.connect().auctionHistory({
      startTime,
      daoId: collectionAddress,
      orderDirection: OrderDirection.Asc,
      orderBy: Auction_OrderBy.EndTime,
      first: 1000
    })
```    
## Wagmi cli

this project uses [Wagmi CLI](https://wagmi.sh/cli/getting-started) to interact with contracts

to add new contracts, set them up on `wagmi.config.ts` and run `yarn wagmi generate` to update the sdk
You might need to add a ETHERSCAN_API_KEY for it to work, like so:
```
ETHERSCAN_API_KEY=<key-here> pnpm wagmi generate
```
