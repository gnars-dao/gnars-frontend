# Gnars Mainnet Goldsky Subgraph

## 👉 Getting started & everything you need to know about deploying to Goldsky

This package provides the subgraph code for all Gnars DAO contracts on Ethereum mainnet using
the [Goldsky](https://goldsky.com/) SDK.

## Requirements

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

pnpm codegen;
pnpm build;
```

### Step 4 - Deploy New or Updated subgraph

**Note:** The subgraph name is `gnars-mainnet` and you should always bump the version if you make changes, but the *
*--tag**
flag allows it to always point to the latest version so the front ends never need to make changes to the URI on every
minor
deploy.

**Never forget to tag!**

```bash
# FROM: ./subgraph
$ goldsky subgraph deploy gnars-mainnet/1.0.1 --path .        
$ goldsky subgraph tag create gnars-mainnet/1.0.1 --tag latest
```

### Step 5 - Query the Subgraph

You can now query the subgraph in the GraphQL playground to test your changes, **but be aware it may take a few hours to
fully index.**

**TODO: Good practices:**  
A good practice to deploy in mainnet is to have a duplicate/backup subgraph so that if something goes wrong, the
traffic can be redirected to the duplicate subgraph instead of having to wait for the subgraph to re-deploy/rollback to
a previous version.

## Current Deployments:  
Goldsky, Alchemy, and The Graph decentralized network