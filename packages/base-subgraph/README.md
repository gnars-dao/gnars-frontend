# Gnars Base Goldsky Subgraph

## 👉 Getting started & everything you need to know about deploying to Goldsky

This package provides the subgraph code for all Gnars DAO contracts on Base mainnet using
the [Goldsky](https://goldsky.com/) SDK.

## Initial Requirements

- Node.js v18 LTS
- pnpm

## Setup

### Step 1 - Install dependencies

`pnpm install`

### Step 2 - Set up Goldsky

1. Ask to join the team account at [goldsky.com](https://goldsky.com)
2. Create an API key for yourself on the Settings page
3. Install the Goldsky CLI:

```bash
curl https://goldsky.com | sh  
```  

4. Log in with the API key created earlier:

```bash
goldsky login
```

### Step 3 - Build Subgraph

```bash
# FROM: ./subgraph;
pnpm prepare
pnpm codegen
pnpm build
```

### Step 4 - Deploy New or Updated subgraph

**Note:** The subgraph name is `gnars-base` and you should always bump the version if you make changes, but the --tag
allows it to always point to the `latest` version so the front ends never need to make changes to the URI on every minor
deploy. Never forget to tag!

```bash
# FROM: ./base-subgraph
$ goldsky subgraph deploy gnars-mainnet/1.0.1 --path .        
$ goldsky subgraph tag create gnars-mainnet/1.0.1 --tag latest
```

### Step 5 - Query the Subgraph

You can now query the subgraph in the GraphQL playground to test your changes, but be aware it may take a few hours to
fully index.

**TODO: Good practices:**  
A good practice to deploy in mainnet is to have a duplicate/backup subgraph so that if something goes wrong, the
traffic can be redirected to the duplicate subgraph instead of having to wait for the subgraph to re-deploy/rollback to
a previous version.

## Base Subgraph Endpoints:

### Base Mainnet
API Endpoint: https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn  
Explorer: https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn

### Current Base Addresses

**NFT:**  
-Proxy: 0x880Fb3Cf5c6Cc2d7DFC13a993E839a9411200C17  
-Implementation: 0xe77e4fa003b2cc07ad10a9d1db216cae5ed14d3f  
-Block Number: 9893263

**Auction House:**  
-Proxy: 0x494eaa55ecf6310658b8fc004b0888dcb698097f  
-Implementation: 0xf958872ceb73bA7d0acA0c7a9905119BCb371dEC   
-Block: 9893263  

**Governor**  
-Proxy: 0x3dd4e53a232b7b715c9ae455f4e732465ed71b4c  
-Implementation: 0x9Af9f31BAE469c13528B458E007A7EA965BD14bB  
-Block: 9893263  

**Treasury**  
-Proxy: 0x72ad986ebac0246d2b3c565ab2a1ce3a14ce6f88  
-Implementation: 0xaf75199b91AEDBe2B99476899782C5Bb507393E0  
-Block: 9893263  

**Metadata**  
-Proxy: 0xdc9799d424ebfdcf5310f3bad3ddcce3931d4b58  
-Implementation: 0xB4Ca85D61f7fcCe0d176Fdb743860daBF3FC03f9  
-Block: 1991576  