import { ContractConfig, defineConfig } from "@wagmi/cli"
import { etherscan, react } from "@wagmi/cli/plugins"
import { base, mainnet } from "wagmi/chains"

import gnarsDaoAbi from "./abis/GnarsDAOLogicV2.json"
import gnarsV2TokenABI from "./abis/GnarsV2Token.json"
import gnarsV2AuctionHouseABI from "./abis/SkateContractV2AuctionHouseV2.json"

export default defineConfig({
  out: "utils/sdk.ts",
  contracts: [
    {
      name: "GnarsV2AuctionHouse",
      abi: gnarsV2AuctionHouseABI as ContractConfig["abi"],
      address: {
        [mainnet.id as 1]: "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209" as `0x${string}`,
      },
    },
    {
      name: "GnarsDAO",
      abi: gnarsDaoAbi as ContractConfig["abi"],
      address: {
        [mainnet.id as 1]: "0x156E94a6e16244cCFDf16E1193198Ea9d80dD7E3" as `0x${string}`,
      },
    },
    {
      name: "GnarsV2Token",
      abi: gnarsV2TokenABI as ContractConfig["abi"],
      address: {
        [mainnet.id as 1]: "0x558BFFF0D583416f7C4e380625c7865821b8E95C" as `0x${string}`,
        [base.id as 8453]: "0x880Fb3Cf5c6Cc2d7DFC13a993E839a9411200C17" as `0x${string}`,
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
})