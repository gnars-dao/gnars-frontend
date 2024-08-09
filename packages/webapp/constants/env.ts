import { CHAIN_IDS } from "./types"

export const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
export const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
export const basescanApiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY
export const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!

export const networkType = process.env.NEXT_PUBLIC_NETWORK_TYPE || "mainnet"

export const PUBLIC_SUBGRAPH_URL = {
  [CHAIN_IDS.ETHEREUM]:
    process.env.NEXT_PUBLIC_ETHEREUM_SUBGRAPH_URL ||
    "https://api.goldsky.com/api/public/project_clwh32mvalyh201vi1ck71seq/subgraphs/gnars-mainnet/latest/gn",
  [CHAIN_IDS.BASE]:
    process.env.NEXT_PUBLIC_BASE_SUBGRAPH_URL ||
    "https://api.goldsky.com/api/public/project_clz4ukquribdy010b1fgua9nm/subgraphs/gnars-base/latest/gn",
  [CHAIN_IDS.BASE_SEPOLIA]: process.env.NEXT_PUBLIC_BASE_SEPOLIA_SUBGRAPH_URL || ""
}
