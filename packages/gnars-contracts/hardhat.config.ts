import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@openzeppelin/hardhat-upgrades"
import "hardhat-abi-exporter"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.6",
      },
      {
        version: "0.8.18",
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/DLaAUbKUZDJjAnUJNWxO7rDgI-8Ko5Cf",
        blockNumber: 16819216,
      },
    },
  },
  abiExporter: {
    runOnCompile: true,
    clear: true,
  },
}

export default config
