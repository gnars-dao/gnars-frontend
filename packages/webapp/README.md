# Gnars webapp

## Getting started

install dependencies
```
yarn
```

run dev server
```
yarn dev
```

## subgraph queries

this project uses [Graph Client](https://github.com/graphprotocol/graph-client) to interact with the gnars subgraph in a type-safe way

to add new queries, add them on the `queries` folder, then generate new typescript binding by running:
```
yarn graphclient build
```

the bindings should be generated on the `.graphclient` folder

## Wagmi cli

this project uses [Wagmi CLI](https://wagmi.sh/cli/getting-started) to interact with contracts

to add new contracts, set them up on `wagmi.config.ts` and run `yarn wagmi generate` to update the sdk
You might need to add a ETHERSCAN_API_KEY for it to work, like so:
```
ETHERSCAN_API_KEY=<key-here> yarn wagmi generate
```
