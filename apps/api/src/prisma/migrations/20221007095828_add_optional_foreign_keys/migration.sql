-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_auctionId_fkey";

-- AlterTable
ALTER TABLE "Bid" ALTER COLUMN "auctionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Winner" ALTER COLUMN "auctionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE SET NULL ON UPDATE CASCADE;
