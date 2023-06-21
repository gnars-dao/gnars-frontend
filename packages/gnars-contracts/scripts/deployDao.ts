import { time } from "@nomicfoundation/hardhat-network-helpers"
import { ethers } from "hardhat"

async function main() {
  const [deployer] = await ethers.getSigners()
  const balanceBefore = await deployer.getBalance()

  const gnarsV2Token = "0x558bfff0d583416f7c4e380625c7865821b8e95c"
  const vetoer = "0x194579cc2E17e427Ab810602CE3f534E697Ac13c"

  const secondsInADay = 86_400
  const secondsBetweenBlocks = 12
  const twoDaysInBlocks = (2 * secondsInADay) / secondsBetweenBlocks
  const fiveDaysInBlocks = (5 * secondsInADay) / secondsBetweenBlocks
  const votingPeriodInBlocks = fiveDaysInBlocks
  const votingDelayInBlocks = twoDaysInBlocks
  const twoDaysInSeconds = time.duration.days(2)
  const executionDelayInSeconds = twoDaysInSeconds

  const gnarsDaoLogicV2Factory = await ethers.getContractFactory(
    "GnarsDAOLogicV2",
    deployer
  )

  const gnarsDaoProxyV2Factory = await ethers.getContractFactory(
    "GnarsDAOProxyV2",
    deployer
  )

  const gnarsDaoExecutorFactory = await ethers.getContractFactory(
    "GnarsDAOExecutor",
    deployer
  )

  const proposalThresholdBPS = 25

  const logic = await gnarsDaoLogicV2Factory.deploy()
  console.log("logic deployed to:", logic.address)

  const currentNonce = await deployer.getTransactionCount()

  const expectedGnarsProxyAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: currentNonce + 1,
  })

  const executor = await gnarsDaoExecutorFactory.deploy(
    expectedGnarsProxyAddress, //admin
    executionDelayInSeconds //execution delay
  )
  console.log("executor deployed to:", executor.address)
  console.log("verification parameters:", [
    expectedGnarsProxyAddress,
    executionDelayInSeconds,
  ])

  const daoProxy = await gnarsDaoProxyV2Factory.deploy(
    executor.address, //timelock address
    gnarsV2Token,
    vetoer,
    executor.address, // admin
    logic.address, // implementation
    votingPeriodInBlocks,
    votingDelayInBlocks,
    proposalThresholdBPS,
    {
      maxQuorumVotesBPS: 1000, // 10%
      minQuorumVotesBPS: 1000, // 10%
      quorumCoefficient: 1000000,
    }
  )
  console.log("daoProxy deployed to:", daoProxy.address)
  console.log("verification parameters:", [
    executor.address, //timelock address
    gnarsV2Token,
    vetoer,
    executor.address, // admin
    logic.address, // implementation
    votingPeriodInBlocks,
    votingDelayInBlocks,
    proposalThresholdBPS,
    {
      maxQuorumVotesBPS: 1000, // 10%
      minQuorumVotesBPS: 1000, // 10%
      quorumCoefficient: 1000000,
    },
  ])
  const balanceAfter = await deployer.getBalance()

  const deploymentExpenses = balanceBefore.sub(balanceAfter)
  console.log(
    "deployment expenses:",
    ethers.utils.formatEther(deploymentExpenses),
    "ETH"
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
