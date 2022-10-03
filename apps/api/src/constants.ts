import { PrismaClient } from "@prisma/client"
import { providers } from "ethers"
import { SkateContractV2AuctionHouse__factory } from "./types/contracts"

export const prisma = new PrismaClient()
export const provider = new providers.AlchemyProvider(
  1,
  process.env["ALCHEMY_API_KEY"]
)

export const V2_AUCTION_ADDRESS = "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"

export const v2AuctionHouse = SkateContractV2AuctionHouse__factory.connect(
  V2_AUCTION_ADDRESS,
  provider
)
