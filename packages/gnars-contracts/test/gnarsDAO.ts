import { mine, reset, time } from "@nomicfoundation/hardhat-network-helpers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ethers } from "hardhat"
import { GnarsDAOExecutor, GnarsDAOLogicV2 } from "../typechain-types"
import { SkateContractV2 } from "../typechain-types/contracts/gnarsV2/token"

describe("GnarsDAO", () => {
  let gnarsV2Token: SkateContractV2
  let deployer: SignerWithAddress
  let gami: SignerWithAddress
  let multisigTreasury: SignerWithAddress
  let randomWallet: SignerWithAddress
  let executor: GnarsDAOExecutor
  let dao: GnarsDAOLogicV2
  const twoDaysInBlocks = 14_400
  const votingPeriodInBlocks = twoDaysInBlocks
  const votingDelayInBlocks = twoDaysInBlocks
  const twoDaysInSeconds = time.duration.days(2)
  const executionDelayInSeconds = twoDaysInSeconds

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

    const proposalThresholdBPS = 10

    const logic = await gnarsDaoLogicV2Factory.deploy()

    const currentNonce = await deployer.getTransactionCount()

    const expectedGnarsProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: currentNonce + 1,
    })

    const executor = await gnarsDaoExecutorFactory.deploy(
      expectedGnarsProxyAddress,
      executionDelayInSeconds
    )
    const proxy = await gnarsDaoProxyV2Factory.deploy(
      executor.address,
      gnarsV2Token.address,
      gami.address,
      executor.address,
      logic.address,
      votingPeriodInBlocks,
      votingDelayInBlocks,
      proposalThresholdBPS,
      {
        maxQuorumVotesBPS: 200,
        minQuorumVotesBPS: 200,
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

  it("allows delegation of votes", async () => {
    const gamiGnars = await gnarsV2Token.balanceOf(gami.address)
    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    const tx = await gnarsV2Token
      .connect(gamiSigner)
      .delegate(randomWallet.address)
      .then((tx) => tx.wait())

    await mine(1)
    expect(
      await gnarsV2Token.getPriorVotes(gami.address, tx.blockNumber)
    ).to.be.equal(0)
    expect(
      await gnarsV2Token.getPriorVotes(randomWallet.address, tx.blockNumber)
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

  it("allows to change executor parameters via proposal", async () => {
    const targets = [executor.address]
    const values = ["0"]
    const signatures = [
      executor.interface.functions["setDelay(uint256)"].format(),
    ]
    const abi = new ethers.utils.AbiCoder()
    const sevenDays = time.duration.days(7)
    const callDatas = [abi.encode(["uint256"], [sevenDays])]

    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    const propId = await dao
      .connect(gamiSigner)
      .propose(
        targets,
        values,
        signatures,
        callDatas,
        "Setting executor delay to 7 days"
      )
      .then((tx) => tx.wait())
      .then((receipt) => receipt?.events?.[0]?.args?.[0]?.toString())

    await mine(votingDelayInBlocks)

    await dao.connect(gamiSigner).castVote(propId, "1")

    await mine(votingPeriodInBlocks)

    await dao.connect(gamiSigner).queue(propId)

    await time.increase(executionDelayInSeconds)

    await expect(dao.connect(gamiSigner).execute(propId)).not.to.be.reverted
    expect(await executor.delay()).to.be.equal(sevenDays)
  })

  it("allows executor to expend funds via proposal", async () => {
    const johnDoesWallet = await ethers.getSigner(
      "0xd7fe5a4a74d18c85bcb6a1f5e11fd79a00814a8f"
    )
    const targets = [johnDoesWallet.address]
    const values = [ethers.utils.parseEther("10")]
    const signatures = [""]
    const callDatas = ["0x"]

    const multisigTreasury = await ethers.getImpersonatedSigner(
      "0x0658f4eD17289144717713ADfFC2539eF7c2EF8e"
    )
    const initialBalance = await ethers.provider.getBalance(executor.address)
    await expect(
      executor.connect(multisigTreasury).fallback({
        value: ethers.utils.parseEther("10"),
      }),
      "Sending 10 ETH to executor"
    ).not.to.be.reverted

    expect(await ethers.provider.getBalance(executor.address)).to.be.equal(
      ethers.utils.parseEther("10").add(initialBalance),
      "Executor balance increased by 10ETH"
    )

    const gamiSigner = await ethers.getImpersonatedSigner(gami.address)
    const propId = await dao
      .connect(gamiSigner)
      .propose(
        targets,
        values,
        signatures,
        callDatas,
        "Paying John Doe 10 ETH for his work"
      )
      .then((tx) => tx.wait())
      .then((receipt) => receipt?.events?.[0]?.args?.[0]?.toString())

    await mine(votingDelayInBlocks)

    await dao.connect(gamiSigner).castVote(propId, "1")

    await mine(votingPeriodInBlocks)

    await dao.connect(gamiSigner).queue(propId)

    await time.increase(executionDelayInSeconds)

    await expect(dao.connect(gamiSigner).execute(propId)).not.to.be.reverted
    expect(await johnDoesWallet.getBalance()).to.be.equal(
      ethers.utils.parseEther("10"),
      "John Doe received 10 ETH"
    )
    expect(await ethers.provider.getBalance(executor.address)).to.be.equal(
      initialBalance,
      "Executor balance was deducted by 10ETH"
    )
  })

  before(async () => {
    ;[deployer, randomWallet] = await ethers.getSigners()
    gnarsV2Token = await ethers
      .getContractFactory("SkateContractV2")
      .then((f) => f.attach("0x558bfff0d583416f7c4e380625c7865821b8e95c"))

    gami = await ethers.getSigner("0x387a161C6b25aA854100aBaED39274e51aaffffd")
    multisigTreasury = await ethers.getSigner(
      "0x0658f4eD17289144717713ADfFC2539eF7c2EF8e"
    )
  })

  beforeEach(async () => {
    await reset(process.env.JSON_RPC_URL, 16819216)

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

    const proposalThresholdBPS = 10

    const logic = await gnarsDaoLogicV2Factory.deploy()

    const currentNonce = await deployer.getTransactionCount()

    const expectedGnarsProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: currentNonce + 1,
    })

    executor = await gnarsDaoExecutorFactory.deploy(
      expectedGnarsProxyAddress,
      executionDelayInSeconds
    )

    const daoProxy = await gnarsDaoProxyV2Factory.deploy(
      executor.address,
      gnarsV2Token.address,
      gami.address,
      executor.address,
      logic.address,
      votingPeriodInBlocks,
      votingDelayInBlocks,
      proposalThresholdBPS,
      {
        maxQuorumVotesBPS: 200,
        minQuorumVotesBPS: 200,
        quorumCoefficient: 1000000,
      }
    )

    dao = gnarsDaoLogicV2Factory.attach(daoProxy.address)
  })
})
