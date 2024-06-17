# Gnars monorepo

## About
This is the monorepo for the Gnars DAO. It contains the following packages:
- [webapp](./packages/webapp): The web frontend for Gnars
- [gnars-contracts](./packages/gnars-contracts): The smart contracts for Gnars
- [subgraph](./packages/subgraph): The Graph API resources for Gnars
- ....  
(TODO: Add more information about the project and how to contribute.)

## Getting started with development on the webapp
1. Fork the repo
2. Use the same Node.js version as production: `nvm use 18`
3. Run `pnpm i` to install the dependencies in the root directory
4. Also run `cd ./packages/webapp && pnpm i` to install the dependencies in the webapp directory
5. Run `pnpm dev` in the webapp dir to start the development server
6. Open `http://localhost:3000` in your browser
7. Start coding!