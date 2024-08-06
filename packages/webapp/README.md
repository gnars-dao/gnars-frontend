# Gnars webapp

## Getting started
Install dependencies

```
pnpm i
```

Copy `.env.example` to `.env` and fill in `NEXT_PUBLIC_ALCHEMY_API_KEY`


Run dev server
```
pnpm dev
```

## Docker
Running with `docker compose` will spin up a local EVM node that forks from the Base mainnet so contract functionality can be tested.

Add the local network to your wallet using the URL `http://localhost:8545` and chain ID `31337`.

**Never test with your real wallet!**

Build the docker image:
```
docker build -t gnarswtf .
```

Run docker compose:
```
docker compose up
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
