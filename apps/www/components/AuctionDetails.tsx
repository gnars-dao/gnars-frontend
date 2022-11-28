import useGnar from "hooks/useGnar"

import Link from "next/link"
import { is10thGnar } from "utils"
import { V2_START_ID } from "utils/contracts"
import AuctionInput from "./AuctionInput"
import RoundButton from "./RoundButton"
import TimeCounter from "./TimeCounter"

interface AuctionDetailsProps {
  gnarId: number
}

export default function AuctionDetails(props: AuctionDetailsProps) {
  const { gnarId } = props
  const { isLoading: isGnarLoading, data: gnarData } = useGnar(gnarId)

  console.log(gnarData, gnarId)

  return (
    <div className="w-full lg:dark:text-white px-4 sm:px-10 lg:px-0 lg:max-w-450px">
      <div className="flex flex-col gap-3 pt-[15%]">
        <div className="flex">
          <div>
            {gnarId <= V2_START_ID ? (
              <RoundButton className="opacity-50">←</RoundButton>
            ) : (
              <Link href={`/gnar/${gnarId - 1}`}>
                <a>
                  <RoundButton>←</RoundButton>
                </a>
              </Link>
            )}
          </div>
          <div className="ml-1">
            {gnarData?.isLatestGnar ? (
              <RoundButton className="opacity-50">→</RoundButton>
            ) : (
              <Link href={`/gnar/${gnarId + 1}`}>
                <a>
                  <RoundButton>→</RoundButton>
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="font-secondary text-5xl sm:text-7xl">Gnar {gnarId}</div>
      </div>
      <div className="pt-6">
        <TimeCounter gnarId={gnarId} />
      </div>
      {gnarData?.isLatestGnar ? (
        <div>
          {" "}
          <AuctionInput />
        </div>
      ) : is10thGnar(gnarId) ? (
        <div className="text-16px mt-10 pb-4 border-b border-secondaryText lg:dark:border-white">
          To pay homage and show our respect as a Nouns extension, every 10th
          Gnar for the first 5 years of the project is sent to the Nouns
          Athletes.
        </div>
      ) : null}
      <div>
        {/* {display_gnarId === currentGnarId ? <BidHistory /> : <BidPast />} */}
      </div>
    </div>
  )
}
