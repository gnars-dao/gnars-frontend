import { CHAIN_IDS } from "@constants/types.ts"

const ALCHEMY_RPC_URLS= {
  [CHAIN_IDS.ETHEREUM]: "https://eth-mainnet.g.alchemy.com/v2/",
  [CHAIN_IDS.BASE]: "https://base-mainnet.g.alchemy.com/v2/"
}

export default ALCHEMY_RPC_URLS;