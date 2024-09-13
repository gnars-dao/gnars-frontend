# Gnars webapp

## Setup
### 1. Install dependencies
Install dependencies by running:
```
pnpm i
```

### 2. Update environment variables
Run the following and fill in **ALL** missing values with your personal keys so we don't rate limit each other:
```
cp .env.example .env
```

### 3. Run local EVM node
Assuming you have [Docker Compose](https://docs.docker.com/compose/install/) installed, run:
```
docker compose up
```

This will spin up a local EVM node that forks from the Base mainnet so contract functionality can be tested.

### 4. Run dev server
Run the dev server:
```
pnpm dev
```

This automatically runs the "predev" step to generate the latest schema so you are always up to date with any changes.
## Docker

Running with `docker compose` will spin up a local EVM node that forks from the Base mainnet so contract functionality can be tested.

### 5. Connect to the local EVM network
Add the local network to your wallet using the URL `http://localhost:8545` and chain ID `31337`.

If you're using Metamask, follow [these instructions](https://support.metamask.io/networks-and-sidechains/managing-networks/how-to-add-a-custom-network-rpc/). For other wallets, do a quick Google search.

**⚠️⚠️ Never test with your real wallet! ⚠️⚠️**

Run docker compose:

```bash
docker compose up
```

## Subgraph Queries

This project uses [The Goldsky Client](https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn) to interact with the Gnars subgraph in a type-safe way.

4. Add all new BASE queries/fragments/and requests to `packages/webapp/queries/base/**/*`.

5. I modeled the new resolver for Gnars BASE after the Builder team's approach. You can look in their codebase for unlimited examples.  
- After you have created a new query, and you have tested it out on the Goldsky UI explorer, add it to the queries directory and run `pnpm codegen` to update the new schema changes locally.
- Assuming `graphql-codegen` ran successfully, you should now be able to access it programmatically by `import`ing the `BaseSDK` client from `packages/webapp/queries/resolvers.ts`. It will create a singleton connection to GoldSky if one doesn't already exist,  
    but regardless you still need to call `connect()` on the class every time you want to use it. As an example step 1) `import { BaseSDK } from "@queries/resolvers"` in a new request file like: `packages/webapp/queries/base/requests/auctionHistory.ts`  
    Step 3) If your new query was for `auctionHistory`, for example, you would now be able to query it in the request file like this:  

```js
const data = await BaseSDK.connect().auctionHistory({
      startTime,
      daoId: collectionAddress,
      orderDirection: OrderDirection.Asc,
      orderBy: Auction_OrderBy.EndTime,
      first: 1000
    })
```

## Wagmi CLI

This project uses [Wagmi CLI](https://wagmi.sh/cli/getting-started) to interact with contracts.
```  

## Wagmi cli

To add new contracts, set them up on `wagmi.config.ts` and run `pnpm wagmi generate` to update the sdk.

You might need to add a ETHERSCAN_API_KEY for it to work, like so:

```bash
ETHERSCAN_API_KEY=<key-here> pnpm wagmi generate
```

---

### Base Sepolia Test Network


> Network Name - Base Sepolia Test Netwok
> 
> RPC URL - `https://base-sepolia.gateway.tenderly.co/${TENDERLY_API_KEY}`
> 
> Chain ID - `11155111`
> 
> Currency Symbol - `SepoliaETH`
> 
> Block Explorer URL - `https://sepolia.etherscan.io/`


---

### Hardhat Local Test Network

> Network Name - Hardhat Test Netwok
> 
> RPC URL - `http://eth-sepolia.g.alchemy.com/v2/[YOUR-API-KEY]`
> 
> Chain ID - `11155111`
> 
> Currency Symbol - `SepoliaETH`
> 
> Block Explorer URL - `https://sepolia.etherscan.io/`

