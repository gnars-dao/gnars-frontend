import { PUBLIC_IS_TESTNET } from "@constants/defaultChains";
import { RPC_URL } from "@constants/rpc";
import { CHAIN_ID } from "@constants/types";
import { configureChains } from "wagmi";
import { base, baseSepolia, mainnet, sepolia, zora, zoraSepolia } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const MAINNET_CHAINS = [mainnet, zora, base];
// Mainnet is required here due to hooks like useEnsData that only pull data from mainnet
const TESTNET_CHAINS = [mainnet, sepolia, baseSepolia, zoraSepolia];

export const L1_CHAINS = PUBLIC_IS_TESTNET ? [CHAIN_ID.SEPOLIA] : [CHAIN_ID.ETHEREUM];

export const L2_CHAINS = PUBLIC_IS_TESTNET
  ? [CHAIN_ID.ZORA_SEPOLIA, CHAIN_ID.BASE_SEPOLIA]
  : [CHAIN_ID.ZORA, CHAIN_ID.BASE];

const { chains, publicClient } = configureChains(
  [...TESTNET_CHAINS, ...MAINNET_CHAINS],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URL[chain.id as CHAIN_ID]
      })
    })
  ]
);

export { chains, publicClient };
