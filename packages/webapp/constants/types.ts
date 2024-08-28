import { Chain as WagmiChain } from "wagmi";

export interface Duration {
  seconds?: number;
  days?: number;
  hours?: number;
  minutes?: number;
}

export const enum CHAIN_ID {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337,
  HARDHAT = 31337,
  TENDERLY_BASE_VIRTUAL_TESTNET = 73571, // Tenderly custom virtual testnet chain id
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID;
  slug: string;
  icon: string;
}

export const enum CHAIN_IDS {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337,
  HARDHAT = 31337
}

export const ALCHEMY_RPC_URLS = {
  [CHAIN_IDS.ETHEREUM]: "https://eth-mainnet.g.alchemy.com/v2/",
  [CHAIN_IDS.BASE]: "https://base-mainnet.g.alchemy.com/v2/"
};

export const VIRTUAL_TESTNET_RPC_URLS = {
  [CHAIN_ID.TENDERLY_BASE_VIRTUAL_TESTNET]: {
    ADMIN: "https://virtual.base.rpc.tenderly.co/a34bc874-980f-4887-b295-cade3b952c7d",
    PUBLIC: "https://virtual.base.rpc.tenderly.co/e9439622-ff90-40cb-8c32-bbe63df3dc77"
  }
};

export type AddressType = `0x${string}`;

export type BytesType = `0x${string}`;

export interface Dao {
  governorAddress: string;
  tokenAddress: string;
}

export interface Proposal {
  abstainVotes: number;
  againstVotes: number;
  description: string;
  descriptionHash: string;
  forVotes: number;
  proposalId: string;
  proposalNumber: number;
  proposalThreshold: string;
  proposer: string;
  quorumVotes: string;
  targets: string[];
  timeCreated: string;
  title: string;
  values: string[];
  voteEnd: string;
  voteStart: string;
  snapshotBlockNumber: string;
  transactionHash: string;
  dao: Dao;
}
