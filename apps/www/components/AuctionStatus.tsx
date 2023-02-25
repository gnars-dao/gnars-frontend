import useAuctionTimeLeft from "hooks/useAuctionTimeLeft"
import useGnarInfo from "hooks/useGnarInfo"
import { ensOrShortAddress, is10thGnar, truncatedAmount } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import { FC } from "react"
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback"
import { AvatarWallet } from "./AvatarWallet"

interface TimeCounterProps {
  desiredGnarId?: number
}

export const AuctionStatus: FC<TimeCounterProps> = ({ desiredGnarId }) => {
  const {
    isLoading,
    data: {
      gnar: { auction, gnarId, isLatestGnar, isOg },
    },
  } = useGnarInfo(desiredGnarId)

  const { endTimestamp, latestBidder, latestBid } = { ...auction }
  const auctionTimeLeft = useAuctionTimeLeft(endTimestamp)

  const auctionEnded = auctionTimeLeft === null
  const isTreasuryGnar = is10thGnar(gnarId)
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = auctionEnded && !winner

  if (isLoading)
    return (
      <div className="text-lg text-secondaryText lg:dark:text-white font-bold whitespace-nowrap">
        Loading…
      </div>
    )

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:border-r lg:border-secondaryText lg:dark:border-white lg:pr-10">
        <div className="text-lg font-medium whitespace-nowrap">
          {auctionEnded ? "Winning bid" : "Current bid"}
        </div>
        <div className="text-32px font-medium pt-1 whitespace-nowrap">
          {isBurned || isTreasuryGnar
            ? "N/A"
            : `Ξ ${truncatedAmount(latestBid)}`}
        </div>
      </div>
      <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:pl-10">
        <div className="text-lg font-medium">
          {auctionEnded ? "Winner" : "Auction ends in"}
        </div>
        <div className="text-32px font-medium pt-1 text-right lg:text-left">
          {isBurned ? (
            "Burned"
          ) : (
            <AvatarWallet variant={"delimited"} address={winner} />
          )}
        </div>
      </div>
    </div>
  )
}
