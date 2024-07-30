# Gnars webapp

## Getting started

install dependencies
```
pnpm i
```

copy `.env.example` to `.env` and fill in `NEXT_PUBLIC_ALCHEMY_API_KEY`


run dev server
```
pnpm dev
```

## Subgraph Queries

This project uses [The Goldsky Client](https://goldsky.com/) to interact with the gnars subgraph in a type-safe way

To add new queries, add them on the `queries` folder, then generate follow the README instructions in the subgraph
package


## Wagmi cli

this project uses [Wagmi CLI](https://wagmi.sh/cli/getting-started) to interact with contracts

to add new contracts, set them up on `wagmi.config.ts` and run `yarn wagmi generate` to update the sdk
You might need to add a ETHERSCAN_API_KEY for it to work, like so:
```
ETHERSCAN_API_KEY=<key-here> pnpm wagmi generate
```
