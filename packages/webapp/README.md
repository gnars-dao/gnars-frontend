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

This project
uses [The Goldsky Client](https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn)
to interact with the gnars subgraphs in a type-safe way

To add new queries, add them on the `queries` folder, then run `pnpm codegen` to generate new typescript bindings.  
The bindings are generated to a new `web/subgraph` folder

## subgraph queries

this project uses [Graph Client](https://github.com/graphprotocol/graph-client) to interact with the gnars subgraph in a
type-safe way

to add new queries, add them on the `queries` folder, then generate new typescript binding by running:

```
pnpm graphclient build
```

the bindings should be generated on the `.graphclient` folder

## Wagmi cli

this project uses [Wagmi CLI](https://wagmi.sh/cli/getting-started) to interact with contracts

to add new contracts, set them up on `wagmi.config.ts` and run `yarn wagmi generate` to update the sdk
You might need to add a ETHERSCAN_API_KEY for it to work, like so:
```
ETHERSCAN_API_KEY=<key-here> pnpm wagmi generate
```
