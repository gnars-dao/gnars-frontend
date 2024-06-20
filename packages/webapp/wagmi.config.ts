import { configureChains } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { ContractConfig, defineConfig } from "@wagmi/cli"
import { etherscan, react } from "@wagmi/cli/plugins"
import gnarsGovernorABI from "./abis/base/GovernorABI.json"
import gnarsV2TokenABI from "./abis/base/GnarsV2Token.json"
import auctionHouseABI from "./abis/base/AuctionHouseABI.json"
import { BASE_AUCTION_HOUSE_ADDRESS, BASE_GOVERNOR_ADDRESS, BASE_GNAR_ADDRESS } from "./constants/gnarsDao"
import { alchemyApiKey } from "./constants/env"


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, mainnet],
  [alchemyProvider({ apiKey: alchemyApiKey, chainIds: [base.id, mainnet.id] })],
)
export default defineConfig({
  out: "utils/sdk.ts",
  contracts: [
    {
      name: "GnarsV2AuctionHouse",
      abi: auctionHouseABI as ContractConfig["abi"],
      address: {
        [base.id as 8453]: BASE_AUCTION_HOUSE_ADDRESS as `0x${string}`,
      },
    },
    {
      name: "GnarsDAO",
      abi: gnarsGovernorABI as ContractConfig["abi"],
      address: {
        [base.id as 8453]: BASE_GOVERNOR_ADDRESS as `0x${string}`,
      },
    },
    {
      name: "GnarsV2Token",
      abi: gnarsV2TokenABI as ContractConfig["abi"],
      address: {
        [base.id as 8453]: BASE_GNAR_ADDRESS as `0x${string}`,
      },
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY!,
      chainId: mainnet.id as 1,
      contracts: [
        {
          name: "GnarsOG",
          address: {
            [mainnet.id as 1]: "0x494715b2a3c75dadd24929835b658a1c19bd4552" as `0x${string}`,
          },
        },
        {
          name: "GnarsHD",
          address: {
            [mainnet.id as 1]: "0x75Cd3F538c091C1D514aB1aD9832f54198CAceC0" as `0x${string}`,
          },
        },
        {
          name: "NNSENSReverseResolver",
          address: {
            [mainnet.id as 1]: "0x849F92178950f6254db5D16D1ba265E70521aC1B" as `0x${string}`,
          },
        },
      ],
    }),
    react({ useContractFunctionWrite: true }),
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})
