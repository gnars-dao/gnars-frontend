/*
  Warnings:

  - You are about to drop the column `auctionId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `auctionId` on the `Winner` table. All the data in the column will be lost.
  - You are about to drop the `Auction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_auctionId_fkey";

-- DropIndex
DROP INDEX "Winner_auctionId_key";

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "auctionId";

-- AlterTable
ALTER TABLE "Winner" DROP COLUMN "auctionId";

-- DropTable
DROP TABLE "Auction";

-- CreateTable
CREATE TABLE "Gnar" (
    "gnarId" INTEGER NOT NULL,
    "startTimestamp" TIMESTAMP(3),
    "endTimestamp" TIMESTAMP(3),

    CONSTRAINT "Gnar_pkey" PRIMARY KEY ("gnarId")
);

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_gnarId_fkey" FOREIGN KEY ("gnarId") REFERENCES "Gnar"("gnarId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_gnarId_fkey" FOREIGN KEY ("gnarId") REFERENCES "Gnar"("gnarId") ON DELETE RESTRICT ON UPDATE CASCADE;
