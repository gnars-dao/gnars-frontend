/*
  Warnings:

  - The primary key for the `Winner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `timestamp` on the `Bid` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gnarId` on the `Winner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timestamp` on the `Winner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_pkey",
DROP COLUMN "gnarId",
ADD COLUMN     "gnarId" INTEGER NOT NULL,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Winner_pkey" PRIMARY KEY ("gnarId");
