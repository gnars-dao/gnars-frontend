/*
  Warnings:

  - Added the required column `currentOwner` to the `Gnar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gnar" ADD COLUMN     "currentOwner" TEXT NOT NULL;
