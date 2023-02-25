import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { useEnsName } from "wagmi"

import useAuctionTimeLeft from "hooks/useAuctionTimeLeft"
import useGnarInfo from "hooks/useGnarInfo"
import { ensOrShortAddress, is10thGnar, truncatedAmount } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import { FC } from "react"

interface TimeCounterProps {
  desiredGnarId?: number
}

export const LatestBid: FC<TimeCounterProps> = ({ desiredGnarId }) => {
  const {
    isLoading,
    data: {
      gnar: { auction, gnarId, isLatestGnar, isOg },
    },
  } = useGnarInfo(desiredGnarId)

  const { endTimestamp, latestBidder, latestBid } = { ...auction }
  const auctionTimeLeft = useAuctionTimeLeft(endTimestamp)

  const winner = latestBidder

  const { data: winnerEnsName, isLoading: isEnsLoading } = useEnsName({
    address: latestBidder,
  })
  const { data: latestBidEnsName, isLoading: isLatestBidEnsLoading } =
    useEnsName({
      address: latestBidder,
    })

  const { data: treasuryEns, isLoading: isTreasuryEnsLoading } = useEnsName({
    address: TREASURY_ADDRESS,
  })

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
          {auctionTimeLeft ? "Current bid" : "Winning bid"}
        </div>
        <div className="text-32px font-medium pt-1 whitespace-nowrap">
          {/* If 10th Noun no winner */}
          {is10thGnar(gnarId) && "N/A"}
          {/* If time left and has a bid return value */}
          {auctionTimeLeft && latestBid && `Ξ ${truncatedAmount(latestBid)}`}
          {/* If no time left but has bid show amount */}
          {!winner &&
            latestBid &&
            !auctionTimeLeft &&
            `Ξ ${truncatedAmount(latestBid)}`}
          {/* If a winner show amount */}
          {winner && `Ξ ${truncatedAmount(latestBid)}`}
          {/* If no time left and no winner and no bids and not 10th Gnar show 0 */}
          {!auctionTimeLeft &&
            !winner &&
            !latestBid &&
            !is10thGnar(gnarId) &&
            "Ξ 0"}
        </div>
      </div>
      <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:pl-10">
        <div className="text-lg font-medium">
          {auctionTimeLeft ? "Auction ends in" : "Winner"}
        </div>
        <div className="text-32px font-medium pt-1 text-right lg:text-left">
          {isLatestGnar ? (
            <>
              {/* If has time remaining, show countdown */}
              {auctionTimeLeft && auctionTimeLeft}
              {/* If the timer has finished with no bids show no winner */}
              {!auctionTimeLeft &&
                !latestBid &&
                !is10thGnar(gnarId) &&
                "No Winner"}
              {/* If the timer has finished bids show the winner address  */}
              {!auctionTimeLeft && latestBid && !is10thGnar(gnarId) && (
                <div className="flex flex-row gap-3 items-center">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(latestBidder)}
                  />
                  <span className="whitespace-nowrap">
                    {ensOrShortAddress(latestBidder, latestBidEnsName)}
                  </span>
                </div>
              )}
              {/* If 10th Noun no winner */}
              {is10thGnar(gnarId) && (
                <div className="flex flex-row gap-3 items-center">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(TREASURY_ADDRESS)}
                  />
                  <span className="whitespace-nowrap">
                    {ensOrShortAddress(TREASURY_ADDRESS, treasuryEns)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              {/* If the gnar has no bids show no winner */}
              {!latestBid && !is10thGnar(gnarId) && "No Winner"}
              {/* If the gnar has finished bids show the winner address  */}
              {latestBid && !is10thGnar(gnarId) && (
                <div className="flex flex-row gap-3 items-center">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(latestBidder)}
                  />
                  <span className="whitespace-nowrap">
                    {ensOrShortAddress(latestBidder, latestBidEnsName)}
                  </span>
                </div>
              )}
              {/* If 10th Noun no winner */}
              {is10thGnar(gnarId) && (
                <div className="flex flex-row gap-3 items-center">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(TREASURY_ADDRESS)}
                  />
                  <span className="whitespace-nowrap">
                    {ensOrShortAddress(TREASURY_ADDRESS, treasuryEns)}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
