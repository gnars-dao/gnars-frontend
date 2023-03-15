import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import {
  impersonateAccount,
  time,
} from "@nomicfoundation/hardhat-network-helpers"
import { utils } from "ethers"
import { ethers, upgrades } from "hardhat"
import {
  SkateContractV2AuctionHouse,
  SkateContractV2AuctionHouseV2,
} from "../typechain-types"
import { SkateContractV2 } from "../typechain-types/gnarsV2/token"

describe("GnarsDAO", () => {
  const gnarsV2TokenAddress = "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"
  let gnarsV2Token: SkateContractV2
  let deployer: SignerWithAddress
  let gami: SignerWithAddress
  let randomWallet: SignerWithAddress
  let snapshotId: number

  const getDaoContracts = async () => {
    const gnarsDaoLogicV2Factory = await ethers.getContractFactory(
      "GnarsDAOLogicV2",
      deployer
    )

    const gnarsDaoProxyFactory = await ethers.getContractFactory(
      "GnarsDAOProxy",
      deployer
    )

    const gnarsDaoExecutorFactory = await ethers.getContractFactory(
      "GnarsDAOExecutor",
      deployer
    )

    const twoDays = 172800

    const logic = await gnarsDaoLogicV2Factory.deploy()
    const executor = await gnarsDaoExecutorFactory.deploy(
      deployer.address,
      twoDays
    )
    const proxy = await gnarsDaoProxyFactory.deploy(
      executor.address,
      gnarsV2TokenAddress,
      gami.address,
      executor.address,
      logic.address,
      twoDays,
      twoDays,
      10,
      50
    )
  }

  before(async () => {
    ;[deployer, randomWallet] = await ethers.getSigners()
    gnarsV2Token = await ethers
      .getContractFactory("SkateContractV2")
      .then((f) => f.attach("0x558BFFF0D583416f7C4e380625c7865821b8E95C"))

    gami = await ethers.getSigner("0x387a161C6b25aA854100aBaED39274e51aaffffd")
  })

  beforeEach(async () => {
    snapshotId = await ethers.provider.send("evm_snapshot", [])
  })

  afterEach(async () => {
    await ethers.provider.send("evm_revert", [snapshotId])
  })
})
