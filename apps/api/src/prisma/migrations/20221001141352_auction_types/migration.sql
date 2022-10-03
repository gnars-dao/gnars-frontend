/*
  Warnings:

  - The primary key for the `Auction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `auctionId` column on the `Bid` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gnarId` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startTimestamp` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTimestamp` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `auctionId` on the `Winner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_auctionId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_pkey",
DROP COLUMN "gnarId",
ADD COLUMN     "gnarId" INTEGER NOT NULL,
DROP COLUMN "startTimestamp",
ADD COLUMN     "startTimestamp" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTimestamp",
ADD COLUMN     "endTimestamp" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Auction_pkey" PRIMARY KEY ("gnarId");

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "auctionId",
ADD COLUMN     "auctionId" INTEGER;

-- AlterTable
ALTER TABLE "Winner" DROP COLUMN "auctionId",
ADD COLUMN     "auctionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Winner_auctionId_key" ON "Winner"("auctionId");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE RESTRICT ON UPDATE CASCADE;
