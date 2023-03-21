import { defineConfig } from "@dethcrypto/eth-sdk"

export default defineConfig({
  contracts: {
    mainnet: {
      gnarsToken: "0x558bfff0d583416f7c4e380625c7865821b8e95c",
    },
  },
  outputPath: "./eth-sdk/generated",
})
