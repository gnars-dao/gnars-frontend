import { configureChains } from "wagmi"
import { base, baseSepolia, mainnet, optimism, optimismSepolia, sepolia, zora, zoraSepolia } from "wagmi/chains"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { useWalletConnectUri } from "connectkit/build/hooks/connectors/useWalletConnectUri"
import { ALCHEMY_RPC_URLS, CHAIN_IDS } from "constants/types.tsx"
import { alchemyApiKey, walletConnectProjectId } from "constants/env.ts"

const MAINNET_CHAINS = [mainnet, base] // Needed due to hooks like useEnsData that only pull data from mainnet

const TESTNET_CHAINS = [baseSepolia]

export const L1_CHAINS = [CHAIN_IDS.ETHEREUM]

export const L2_CHAINS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet" ? [CHAIN_IDS.BASE_SEPOLIA] : [CHAIN_IDS.BASE]

const { chains, publicClient } = configureChains(
  [...TESTNET_CHAINS, ...MAINNET_CHAINS],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        // @ts-ignore
        http: `${ALCHEMY_RPC_URLS.get(chain.id as CHAIN_IDS) + alchemyApiKey}`
      })
    })
  ]
)

export { chains, publicClient }
