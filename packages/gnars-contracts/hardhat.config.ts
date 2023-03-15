import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@openzeppelin/hardhat-upgrades"
import "@openzeppelin/hardhat-defender"
import "hardhat-abi-exporter"
import dotenv from "dotenv"

dotenv.config()

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
    mainnet: {
      url: "https://eth-mainnet.alchemyapi.io/v2/DLaAUbKUZDJjAnUJNWxO7rDgI-8Ko5Cf",
      chainId: 1,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
    },
  },
  abiExporter: {
    runOnCompile: true,
    clear: true,
  },
  defender: {
    apiKey: process.env.DEFENDER_API_KEY!,
    apiSecret: process.env.DEFENDER_API_SECRET!,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY!,
    },
  },
}

export default config
