// @FIX: Not currently tested working
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-defender";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";
import "hardhat-abi-exporter";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.JSON_RPC_URL!,
        blockNumber: 16819216
      }
    },
    mainnet: {
      url: process.env.JSON_RPC_URL,
      chainId: 1,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : undefined
    }
  },
  abiExporter: {
    runOnCompile: true,
    clear: true
  },
  defender: {
    apiKey: process.env.DEFENDER_API_KEY!,
    apiSecret: process.env.DEFENDER_API_SECRET!
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY!
    }
  }
};

export default config;
