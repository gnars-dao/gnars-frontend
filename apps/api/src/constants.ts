// This setup is needed for using Prisma with pnpm
// https://github.com/prisma/prisma/issues/6603
import Prisma1, * as Prisma2 from "@prisma/client"
import { providers } from "ethers"
import { SkateContractV2AuctionHouse__factory } from "./types/contracts"

const Prisma = Prisma1 || Prisma2

export const prisma = new Prisma.PrismaClient()
export const provider = new providers.AlchemyProvider(
  1,
  process.env["ALCHEMY_API_KEY"]
)

export const V2_AUCTION_ADDRESS = "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209"

export const v2AuctionHouse = SkateContractV2AuctionHouse__factory.connect(
  V2_AUCTION_ADDRESS,
  provider
)
