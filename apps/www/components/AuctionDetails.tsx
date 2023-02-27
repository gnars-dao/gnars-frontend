import useGnarInfo from "hooks/useGnarInfo"

import Link from "next/link"
import { is10thGnar } from "utils"
import { V2_START_ID } from "utils/contracts"
import Bids from "./Bids"
import { RoundButton } from "./RoundButton"
import { AuctionStatus } from "./AuctionStatus"
import { FC } from "react"
import { Box, HStack, Spinner, Text } from "@chakra-ui/react"
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
  const isOg = desiredGnarId <= V2_START_ID || gnar?.isOg
  const numericGnarId = gnar ? parseInt(gnar.gnarId) : undefined
  const isLatestGnar = `${gnarId}` === latestGnarId

  return (
    <Box
      w={{ base: "full", lg: undefined }}
      maxW={{ base: "full", lg: "lg" }}
      px={{ base: 4, sm: 10, lg: 0 }}
    >
      <div className="flex flex-col gap-3 pt-[15%]">
        <HStack spacing={1}>
          <RoundButton
            px={0}
            isDisabled={gnarId <= 0}
            onClick={() => push(`/gnar/${numericGnarId - 1}`)}
          >
            ←
          </RoundButton>
          <RoundButton
            px={0}
            isDisabled={isLoading || isLatestGnar}
            onClick={() => push(`/gnar/${numericGnarId + 1}`)}
          >
            →
          </RoundButton>
          <RoundButton
            isDisabled={isLoading || isLatestGnar}
            onClick={() => push(`/gnar/${latestGnarId}`)}
          >
            Latest auction
          </RoundButton>
        </HStack>
        <div className="font-secondary text-5xl sm:text-7xl">
          <HStack>
            {isOg && <Text>OG</Text>}
            {gnarId ? <Text>Gnar {gnarId}</Text> : <Spinner />}
          </HStack>
        </div>
      </div>
      <div className="pt-6">
        <AuctionStatus desiredGnarId={desiredGnarId} />
      </div>
      {isLatestGnar ? (
        <div>
          {" "}
          <Bids />
        </div>
      ) : !gnar.isOg && is10thGnar(gnarId) ? (
        <Text className="text-16px mt-10 pb-4 border-b border-secondaryText">
          To pay homage and show our respect as a Nouns extension, every Gnar
          ending in 7 is reserved for onboarding shredders.
        </Text>
      ) : null}
      <div>
        {/* {display_gnarId === currentGnarId ? <BidHistory /> : <BidPast />} */}
      </div>
    </Box>
  )
}
