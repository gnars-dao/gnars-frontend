import { providers } from "ethers"
import {
  SkateContractV2AuctionHouse__factory,
  SkateContractV2__factory,
} from "types/contracts"

export const provider = new providers.AlchemyProvider(
  1,
  process.env["NEXT_PUBLIC_ALCHEMY_API_KEY"]
)

export const V2_AUCTION_ADDRESS = "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"
export const OG_GNAR_ADDRESS = "0x494715b2a3c75dadd24929835b658a1c19bd4552"
export const V2_GNAR_ADDRESS = "0x558BFFF0D583416f7C4e380625c7865821b8E95C"
// @TODO switch for DAO treasury after migration
export const TREASURY_ADDRESS = "0x0658f4eD17289144717713ADfFC2539eF7c2EF8e"

export const v2AuctionHouse = SkateContractV2AuctionHouse__factory.connect(
  V2_AUCTION_ADDRESS,
  provider
)

export const v2Gnar = SkateContractV2__factory.connect(
  V2_GNAR_ADDRESS,
  provider
)

export const V2_START_ID = 627
