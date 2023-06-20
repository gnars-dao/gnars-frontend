import { time } from "@nomicfoundation/hardhat-network-helpers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ethers } from "hardhat"
import { GnarsDAOExecutor, GnarsDAOLogicV2 } from "../typechain-types"
import { SkateContractV2 } from "../typechain-types/gnarsV2/token"

describe("GnarsDAO", () => {
  let gnarsV2Token: SkateContractV2
  let deployer: SignerWithAddress
  let gami: SignerWithAddress
  let randomWallet: SignerWithAddress
  let executor: GnarsDAOExecutor
  let dao: GnarsDAOLogicV2

  it("deploys correctly", async () => {
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

    const twoDaysInBlocks = 14_400
    const twoDaysInSeconds = time.duration.days(2)
    const proposalThresholdBPS = 10

    const logic = await gnarsDaoLogicV2Factory.deploy()

    const currentNonce = await deployer.getTransactionCount()

    const expectedGnarsProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: currentNonce + 1,
    })

    const executor = await gnarsDaoExecutorFactory.deploy(
      expectedGnarsProxyAddress,
      twoDaysInSeconds
    )
    const proxy = await gnarsDaoProxyV2Factory.deploy(
      executor.address,
      gnarsV2Token.address,
      gami.address,
      executor.address,
      logic.address,
      twoDaysInBlocks,
      twoDaysInBlocks,
      proposalThresholdBPS,
      {
        maxQuorumVotesBPS: 1500,
        minQuorumVotesBPS: 1000,
        quorumCoefficient: 1000000,
      }
    )

    expect(proxy.address).to.be.equal(expectedGnarsProxyAddress)
    expect(await executor.admin()).to.be.equal(proxy.address)
    expect(await proxy.admin()).to.be.equal(executor.address)
  })

  it("uses Gnars V2 token for voting", async () => {
    const gamiGnars = await gnarsV2Token.balanceOf(gami.address)
    expect(
      await gnarsV2Token.getPriorVotes(gami.address, 16819216)
    ).to.be.equal(gamiGnars)
  })

  it("allows to propose when proposer has enough votes", async () => {
    const targets = [ethers.constants.AddressZero]
    const values = ["0"]
    const signatures = ["getBalanceOf(address)"]
    const abi = new ethers.utils.AbiCoder()
    const callDatas = [abi.encode(["address"], [ethers.constants.AddressZero])]

    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    await expect(
      dao
        .connect(gamiSigner)
        .propose(
          targets,
          values,
          signatures,
          callDatas,
          "Sending my first proposal"
        )
    ).not.to.be.reverted
  })

  it("does not allow to propose when proposer doesn't have enough votes", async () => {
    const targets = [ethers.constants.AddressZero]
    const values = ["0"]
    const signatures = ["getBalanceOf(address)"]
    const abi = new ethers.utils.AbiCoder()
    const callDatas = [abi.encode(["address"], [ethers.constants.AddressZero])]

    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    await expect(
      dao
        .connect(randomWallet)
        .propose(
          targets,
          values,
          signatures,
          callDatas,
          "Sending my first proposal"
        )
    ).to.be.revertedWith(
      "GnarsDAO::propose: proposer votes below proposal threshold"
    )
  })

  // const gnarsTotalSupply = await gnarsV2Token.totalSupply()
  //   expect(await dao.proposalThreshold()).to.be.equal(
  //     gnarsTotalSupply.mul(proposalThresholdBPS).div(10_000)
  //   )

  // })

  before(async () => {
    ;[deployer, randomWallet] = await ethers.getSigners()
    gnarsV2Token = await ethers
      .getContractFactory("SkateContractV2")
      .then((f) => f.attach("0x558bfff0d583416f7c4e380625c7865821b8e95c"))

    gami = await ethers.getSigner("0x387a161C6b25aA854100aBaED39274e51aaffffd")
  })

  beforeEach(async () => {
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

    const twoDaysInBlocks = 14_400
    const twoDaysInSeconds = time.duration.days(2)
    const proposalThresholdBPS = 10

    const logic = await gnarsDaoLogicV2Factory.deploy()

    const currentNonce = await deployer.getTransactionCount()

    const expectedGnarsProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: currentNonce + 1,
    })

    executor = await gnarsDaoExecutorFactory.deploy(
      expectedGnarsProxyAddress,
      twoDaysInSeconds
    )

    const daoProxy = await gnarsDaoProxyV2Factory.deploy(
      executor.address,
      gnarsV2Token.address,
      gami.address,
      executor.address,
      logic.address,
      twoDaysInBlocks,
      twoDaysInBlocks,
      proposalThresholdBPS,
      {
        maxQuorumVotesBPS: 1500,
        minQuorumVotesBPS: 1000,
        quorumCoefficient: 1000000,
      }
    )

    dao = gnarsDaoLogicV2Factory.attach(daoProxy.address)
  })
})
