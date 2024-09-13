import "@nomicfoundation/hardhat-toolbox-viem";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ethereum_mainnet: {
      url: `https://mainnet.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 1
    },
    ethereum_sepolia: {
      url: `https://sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 11155111
    },
    ethereum_holesky: {
      url: `https://holesky.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 17000
    },
    arbitrum: {
      url: `https://arbitrum.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 42161
    },
    arbitrum_nova: {
      url: `https://arbitrum-nova.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 42170
    },
    arbitrum_sepolia: {
      url: `https://arbitrum-sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 421614
    },
    base_mainnet: {
      url: `https://base.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 8453
    },
    base_sepolia: {
      url: `https://base-sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 84532
    },
    blast: {
      url: `https://blast.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 81457
    },
    bob: {
      url: `https://bob.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 60808
    },
    bob_sepolia: {
      url: `https://bob-sepolia.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 808813
    },
    boba_ethereum_mainnet: {
      url: `https://boba-ethereum.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 288
    },
    boba_bnb_mainnet: {
      url: `https://boba-bnb.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 56288
    },
    boba_bnb_testnet: {
      url: `https://boba-bnb-testnet.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 9728
    },
    boba_sepolia: {
      url: `https://boba-sepolia.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 28882
    },
    concrete_testnet: {
      url: `https://concrete-testnet.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 18291
    },
    fraxtal: {
      url: `https://fraxtal.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 252
    },
    fraxtal_holesky: {
      url: `https://fraxtal-holesky.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 2522
    },
    gold: {
      url: `https://gold.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 4653
    },
    immutable: {
      url: `https://immutable.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 13371
    },
    immutable_testnet: {
      url: `https://immutable-testnet.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 13473
    },
    interval_testnet: {
      url: `https://interval-testnet.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 13473
    },
    lisk: {
      url: `https://lisk.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 1135
    },
    lisk_sepolia: {
      url: `https://lisk-sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 4202
    },
    mode: {
      url: `https://mode.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 34443
    },
    mode_sepolia: {
      url: `https://mode-sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 919
    },
    morph_holesky: {
      url: `https://morph-holesky.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 2810
    },
    optimism_mainnet: {
      url: `https://optimism.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 10
    },
    optimism_sepolia: {
      url: `https://optimism-sepolia.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 11155420
    },
    polygon_mainnet: {
      url: `https://polygon.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 137
    },
    polygon_amoy: {
      url: `https://polygon-amoy.gateway.tenderly.co/${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 80002
    },
    taiko: {
      url: `https://taiko-mainnet.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 167000
    },
    taiko_hekla: {
      url: `https://taiko-hekla.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 167009
    },
    real: {
      url: `https://tangible-real.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 111188
    },
    unreal: {
      url: `https://tangible-unreal.gateway.tenderly.co//${process.env.TENDERLY_NODE_ACCESS_KEY}`,
      chainId: 18233
    }
  }
};

export default config;
