import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import {
  impersonateAccount,
  time,
} from "@nomicfoundation/hardhat-network-helpers"
import { ethers, network, upgrades } from "hardhat"
import {
  SkateContractV2AuctionHouse,
  SkateContractV2AuctionHouseV2,
} from "../typechain-types"
import { SkateContractV2 } from "../typechain-types/gnarsV2/token"

describe("GnarsDAO", () => {
  let gnarsV2Token: SkateContractV2
  let deployer: SignerWithAddress
  let gami: SignerWithAddress
  let randomWallet: SignerWithAddress
  let snapshotId: number

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

    const gnarsDao = gnarsDaoLogicV2Factory.attach(proxy.address)

    const gnarsTotalSupply = await gnarsV2Token.totalSupply()
    const gamiGnars = await gnarsV2Token.balanceOf(gami.address)
    expect(
      await gnarsV2Token.getPriorVotes(gami.address, 16819216)
    ).to.be.equal(gamiGnars)

    expect(await gnarsDao.proposalThreshold()).to.be.equal(
      gnarsTotalSupply.mul(proposalThresholdBPS).div(10_000)
    )

    const targets = [ethers.constants.AddressZero]
    const values = ["0"]
    const signatures = ["getBalanceOf(address)"]
    const abi = new ethers.utils.AbiCoder()
    const callDatas = [abi.encode(["address"], [ethers.constants.AddressZero])]

    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    await expect(
      gnarsDao
        .connect(gamiSigner)
        .propose(
          targets,
          values,
          signatures,
          callDatas,
          "Sending my first proposal"
        )
    ).not.to.be.reverted

    await expect(
      gnarsDao
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

  before(async () => {
    ;[deployer, randomWallet] = await ethers.getSigners()
    gnarsV2Token = await ethers
      .getContractFactory("SkateContractV2")
      .then((f) => f.attach("0x558bfff0d583416f7c4e380625c7865821b8e95c"))

    gami = await ethers.getSigner("0x387a161C6b25aA854100aBaED39274e51aaffffd")
  })

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", [])
  })

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId])
  })
})
