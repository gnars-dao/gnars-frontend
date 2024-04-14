# Gnars Monorepo

This is the monorepository for Gnars. Here, we store the code related to the front-end of our Auction site.

You can see this code in action at [gnars.wtf](https://www.gnars.wtf/).

## Packages

### 💻 [Webapp](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/webapp)

The Gnars web application is developed using Next.js, React, Subgraph, and Wagmi. This application facilitates interactions with the DAO, from participating in NFT auctions to viewing and editing proposals. We utilize Chakra-UI for the front-end design.

### 🌐 [Subgraph](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/subgraph)

This Subgraph manages information from an NFT collection named Gnar, with functionalities for auctions, voting, and vote delegation. It details entities like `OgGnar`, `Gnar`, and `Auction`, which record the original NFT, any NFT, and the auctions associated with these NFTs, respectively. Events such as `OgTransferEvent` and `DelegationEvent` are used to record NFT transfers and changes in vote delegation.

### 🤖 [@gnars/bots](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/bots)

A bot that monitors changes in Gnars auctions and notifies on Twitter and Discord for greater community engagement. The project implements the subgraphs also housed in the monorepo. The repository includes a Dockerfile for Redis deployment.

### Contracts

#### 🖼️ [Gnars HD Artwork](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-hd/artwork)

Images, details, and scripts for organizing the artworks that make up the NFTs. Each NFT is composed of various traits such as head, glasses, and background.

#### 📄 [Gnars HD Smart Contracts](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-hd/contract)

Smart contracts of Gnars HD colletion on Ethereum. These contracts are for the creation of NFTs from traits mapping. The GnarsHD contract is a non-transferable ERC-721 NFT.

#### 🛠️ [Sample Hardhat Project](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-contracts)

This project demonstrates a basic Hardhat use case. It includes a sample contract, a test for that contract, and a script that deploys that contract, serving as an introduction to smart contract development in Hardhat.

## 💭 Final Thoughts

If you've made it this far and are unsure where to start, we recommend taking a look at the [Webapp](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/webapp), which is the most user-friendly environment to start getting involved with Gnars.