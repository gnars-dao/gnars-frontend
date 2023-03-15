import { ethers, upgrades, defender } from "hardhat"

async function main() {
  const gnarsAuctionHouseProxyAddress =
    "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"

  const auctionHouseV1Factory = await ethers.getContractFactory(
    "SkateContractV2AuctionHouse"
  )

  await upgrades.forceImport(
    gnarsAuctionHouseProxyAddress,
    auctionHouseV1Factory,
    { kind: "uups" }
  )

  const auctionHousev2 = await ethers.getContractFactory(
    "SkateContractV2AuctionHouseV2"
  )

  const proposal = await defender.proposeUpgrade(
    "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209",
    auctionHousev2,
    {
      kind: "uups",
      title: "Upgrade to new auction house",
      multisigType: "EOA",
      multisig: "0x387a161C6b25aA854100aBaED39274e51aaffffd",
    }
  )

  console.log(proposal.url)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
