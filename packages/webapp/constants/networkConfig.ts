export const enum CHAIN_IDS {
  ETHEREUM = 1,
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

