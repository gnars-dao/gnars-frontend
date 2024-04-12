# Gnars monorepo

## Packages

### 💻 [Webapp](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/webapp)

The Gnars webapp is a dynamic frontend application designed to interact with Gnars smart contracts and subgraphs via the Graph Client and Wagmi CLI. It ensures type-safe querying and seamless integration with blockchain data. Developers can enhance functionality by adding new queries and contract interactions, facilitated by comprehensive command-line tools for code generation and environment setup.

### 🖼️ [Artwork](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-hd/artwork)

Scripts in this package automate the preparation of artwork for NFT creation. `test.js` verifies and indexes artwork files, while `prepare.js` organizes and readies files for IPFS upload via nft.storage, facilitating efficient NFT minting.

### 📄 [Solidity Contracts](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-hd/contract)

This directory houses Solidity contracts essential for the NFT creation process. Scripts automate the deployment and management of these contracts, ensuring seamless integration with the prepared artwork. These contracts enable secure and verified transactions within the NFT ecosystem.

### 🌐 [Subgraph](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/subgraph)

The Subgraph package provides a robust querying API for efficiently accessing blockchain data related to the Gnars projects. It indexes events and entities from Gnars smart contracts on Ethereum, facilitating real-time data retrieval and interaction within our applications. This setup ensures reliable and up-to-date blockchain data integration.

### 🤖 [@gnars/bots](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/bots)

A bot that monitors changes in Gnar auction states and notifies everyone via Twitter and Discord, enhancing community engagement and real-time information sharing.

### 🛠️ [Sample Hardhat Project](https://github.com/gnars-dao/gnars-frontend/tree/main/packages/gnars-contracts)

This project demonstrates a basic Hardhat use case. It includes a sample contract, a test for that contract, and a script that deploys that contract, serving as an introduction to smart contract development in Hardhat.
