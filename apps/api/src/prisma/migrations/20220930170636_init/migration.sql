-- CreateTable
CREATE TABLE "Auction" (
    "gnarId" TEXT NOT NULL,
    "startTimestamp" TEXT NOT NULL,
    "endTimestamp" TEXT NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("gnarId")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "gnarId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "auctionId" TEXT,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winner" (
    "gnarId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("gnarId")
);

-- CreateIndex
CREATE INDEX "Bid_gnarId_idx" ON "Bid"("gnarId");

-- CreateIndex
CREATE UNIQUE INDEX "Winner_auctionId_key" ON "Winner"("auctionId");

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("gnarId") ON DELETE RESTRICT ON UPDATE CASCADE;
