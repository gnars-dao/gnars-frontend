import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { useEnsName } from "wagmi"

import useAuctionTimeLeft from "hooks/useAuctionTimeLeft"
import useGnar from "hooks/useGnar"
import { Bid } from "../../../../utils/CommonTypes"
import { is10thGnar, shortAddress, truncatedAmount } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
// import { TrancatedAmount } from "../../../../utils/funcs"
// import { ShortAddress } from "../../../utils/ShortAddress"

interface TimeCounterProps {
  gnarId: number
  winner?: { amount: string; address: string }
}

export default function TimeCounter(props: TimeCounterProps) {
  const { gnarId } = props
  const { isLoading: isGnarLoading, data: gnarData } = useGnar(gnarId)
  const auctionTimeLeft = useAuctionTimeLeft(gnarData?.endTimestamp)

  console.log(gnarData)

  const latestBid = gnarData?.bids[0]

  const winner = gnarData?.winner

  const { data: ensName, isLoading: isEnsLoading } = useEnsName({
    address: winner?.sender,
  })

  if (isGnarLoading)
    return (
      <div className="text-lg text-secondaryText lg:dark:text-white font-bold whitespace-nowrap">
        Loading…
      </div>
    )

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:border-r lg:border-secondaryText lg:dark:border-white lg:pr-14">
        <div className="text-lg text-secondaryText lg:dark:text-white font-medium whitespace-nowrap">
          {auctionTimeLeft ? "Current bid" : "Winning bid"}
        </div>
        <div className="text-32px font-medium pt-1 whitespace-nowrap">
          {/* If 10th Noun no winner */}
          {is10thGnar(gnarId) && "N/A"}
          {/* If time left and has a bid return value */}
          {auctionTimeLeft &&
            latestBid &&
            `Ξ ${truncatedAmount(latestBid.amount)}`}
          {/* If no time left but has bid show amount */}
          {!winner &&
            latestBid &&
            !auctionTimeLeft &&
            `Ξ ${truncatedAmount(latestBid.amount)}`}
          {/* If a winner show amount */}
          {winner && `Ξ ${truncatedAmount(winner.amount)}`}
          {/* If no time left and no winner and no bids and not 10th Gnar show 0 */}
          {!auctionTimeLeft &&
            !winner &&
            !latestBid &&
            !is10thGnar(gnarId) &&
            "Ξ 0"}
        </div>
      </div>
      <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:pl-14">
        <div className="text-lg text-secondaryText lg:dark:text-white font-medium">
          {auctionTimeLeft ? "Auction ends in" : "Winner"}
        </div>
        <div className="text-4xl font-bold pt-1 text-right lg:text-left">
          <div className="flex flex-row gap-3">
            {/* If 10th Noun no winner */}
            {is10thGnar(gnarId) && (
              <>
                <Jazzicon
                  diameter={40}
                  seed={jsNumberForAddress(TREASURY_ADDRESS)}
                />
                {shortAddress(TREASURY_ADDRESS)}
              </>
            )}
          </div>
          {/* {
            <span className="text-32px">
              {display_gnarId === currentGnarId ? (
                (currentGnarId < V2_START_ID && remainBlocks === "Waiting") ||
                (currentGnarId >= V2_START_ID &&
                  auctionTimeLeft === "Waiting") ? (
                  winner && winner.address && Number(winner.address) !== 0 ? (
                    <div className="flex flex-row gap-3">
                      <Jazzicon
                        diameter={40}
                        seed={jsNumberForAddress(winner.address)}
                      />
                      <ShortAddress address={winner.address} />
                    </div>
                  ) : latestBid !== null ? (
                    <div className="flex flex-row gap-3">
                      <Jazzicon
                        diameter={40}
                        seed={jsNumberForAddress(latestBid.sender)}
                      />
                      <ShortAddress address={latestBid.sender} />
                    </div>
                  ) : (
                    "No Winner"
                  )
                ) : currentGnarId < V2_START_ID ? (
                  remainBlocks + " Blocks"
                ) : (
                  auctionTimeLeft
                )
              ) : winner &&
                winner.address &&
                Number.isFinite(Number(winner.address)) &&
                Number(winner.address) !== 0 ? (
                <div className="flex flex-row gap-3">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(winner.address)}
                  />
                  <ShortAddress address={winner.address} />
                </div>
              ) : winner && winner.address && Number(winner.address) !== 0 ? (
                <div className="flex flex-row gap-3">
                  <Jazzicon
                    diameter={40}
                    seed={jsNumberForAddress(TREASURY_ADDRESS)}
                  />
                  {winner.address}
                </div>
              ) : (
                "No Winner"
              )}
            </span>
          } */}
        </div>
      </div>
    </div>
  )
}
