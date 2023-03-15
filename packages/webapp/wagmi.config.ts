import { etherscan, react } from "@wagmi/cli/plugins"
import { mainnet } from "wagmi/chains"
import { ContractConfig, defineConfig } from "@wagmi/cli"

import gnarsV2AuctionHouseABI from "../../packages/gnars-contracts/abi/contracts/gnarsV2/auctionHouse/v2/SkateContractV2AuctionHouseV2.sol/SkateContractV2AuctionHouseV2.json"

export default defineConfig({
  out: "utils/sdk.ts",
  contracts: [
    {
      name: "GnarsV2AuctionHouse",
      abi: gnarsV2AuctionHouseABI as ContractConfig["abi"],
      address: {
        [mainnet.id as 1]:
          "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209" as `0x${string}`,
      },
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id as 1,
      contracts: [
        {
          name: "GnarsOG",
          address: {
            [mainnet.id as 1]:
              "0x494715b2a3c75dadd24929835b658a1c19bd4552" as `0x${string}`,
          },
        },
        {
          name: "GnarsV2Token",
          address: {
            [mainnet.id as 1]:
              "0x558BFFF0D583416f7C4e380625c7865821b8E95C" as `0x${string}`,
          },
        },
      ],
    }),
    react({ useContractFunctionWrite: true }),
  ],
})
