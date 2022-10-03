/*
  Warnings:

  - A unique constraint covering the columns `[transactionHash]` on the table `Bid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auctionId]` on the table `Bid` will be added. If there are existing duplicate values, this will fail.
  - Made the column `auctionId` on table `Bid` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- AlterTable
ALTER TABLE "Bid" ALTER COLUMN "auctionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Bid_transactionHash_key" ON "Bid"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_auctionId_key" ON "Bid"("auctionId");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE RESTRICT ON UPDATE CASCADE;
