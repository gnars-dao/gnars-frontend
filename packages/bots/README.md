# @gnars/bots

A bot that monitors for changes in Gnar auction state and notifies everyone via Twitter and Discord.

## Install dependencies

```sh
yarn
```

## Fill in environment variables

copy `.env.dist` to `.env` and fill in the values

## Build

this will
- compile the typescript code
- generate the subgraph sdk using [graph-client](https://github.com/graphprotocol/graph-client), including queries from the `src/queries folder`
- generate the contracts sdk using [eth-sdk](https://github.com/dethcrypto/eth-sdk)

```sh
yarn build
```

## Start Redis

```sh
docker-compose up -d
```

## Start bots in dev mode (restarts on file changes)

```sh
yarn dev
```

## Run from built files

```sh
yarn start
```