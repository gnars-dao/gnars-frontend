/*
  Warnings:

  - Changed the type of `gnarId` on the `Bid` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "gnarId",
ADD COLUMN     "gnarId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Bid_gnarId_idx" ON "Bid"("gnarId");
