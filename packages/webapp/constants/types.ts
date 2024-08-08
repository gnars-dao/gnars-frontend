export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export const enum CHAIN_IDS {
  ETHEREUM = 1,
  BASE = 8453,
  BASE_SEPOLIA = 84532
}

export const ALCHEMY_RPC_URLS: Map<number, string> = new Map([
  [CHAIN_IDS.ETHEREUM, "https://eth-mainnet.g.alchemy.com/v2/"],
  [CHAIN_IDS.BASE, "https://base-mainnet.g.alchemy.com/v2/"]
])

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
