import useGnarInfo from "hooks/useGnarInfo"

import Link from "next/link"
import { is10thGnar } from "utils"
import { V2_START_ID } from "utils/contracts"
import AuctionInput from "./AuctionInput"
import { RoundButton } from "./RoundButton"
import { TimeCounter } from "./TimeCounter"
import { FC } from "react"
import { HStack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

interface AuctionDetailsProps {
  desiredGnarId?: number
}

export const AuctionDetails: FC<AuctionDetailsProps> = ({ desiredGnarId }) => {
  const { isLoading, data } = useGnarInfo(desiredGnarId)
  const { push } = useRouter()

  if (isLoading || !data) return <p>Loading...</p>
  const { latestGnarId, gnar } = data
  const gnarId = gnar?.gnarId || desiredGnarId
  const isOg = gnar?.isOg
  const isLatestGnar = gnarId ? gnar.gnarId === latestGnarId : undefined
  const numericGnarId = gnar ? parseInt(gnar.gnarId) : undefined

  return (
    <div className="w-full px-4 sm:px-10 lg:px-0 lg:max-w-450px">
      <div className="flex flex-col gap-3 pt-[15%]">
        <HStack spacing={1}>
          <RoundButton
            px={0}
            disabled={gnarId <= 0}
            onClick={() => push(`/gnar/${numericGnarId - 1}`)}
          >
            ←
          </RoundButton>
          <RoundButton
            px={0}
            disabled={isLatestGnar}
            onClick={() => push(`/gnar/${numericGnarId + 1}`)}
          >
            →
          </RoundButton>
          <RoundButton
            disabled={isLatestGnar}
            onClick={() => push(`/gnar/${latestGnarId}`)}
          >
            Latest
          </RoundButton>
        </HStack>
        <div className="font-secondary text-5xl sm:text-7xl">
          <HStack>
            {isOg && <Text>OG</Text>}
            <Text>Gnar {desiredGnarId}</Text>
          </HStack>
        </div>
      </div>
      <div className="pt-6">
        <TimeCounter desiredGnarId={desiredGnarId} />
      </div>
      {isLatestGnar ? (
        <div>
          {" "}
          <AuctionInput />
        </div>
      ) : !gnar.isOg && is10thGnar(gnarId) ? (
        <div className="text-16px mt-10 pb-4 border-b border-secondaryText">
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
