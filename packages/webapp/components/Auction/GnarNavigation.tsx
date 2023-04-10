import { FC } from "react"
import { useRouter } from "next/router"
import { HStack, StackProps } from "@chakra-ui/react"
import { RoundButton } from "../RoundButton"
import { GnarData } from "../../hooks/useGnarData"

export type AuctionNavigationParams = {
  gnarData?: GnarData
} & StackProps

export const GnarNavigation: FC<AuctionNavigationParams> = ({
  gnarData,
  ...props
}) => {
  const { push } = useRouter()

  if (!gnarData) {
    return (
      <HStack spacing={1} {...props}>
        <RoundButton px={0} isDisabled>
          ←
        </RoundButton>
        <RoundButton px={0} isDisabled>
          →
        </RoundButton>
        <RoundButton px={0} isDisabled>
          Latest auction
        </RoundButton>
      </HStack>
    )
  }

  const {
    gnar: { gnarId },
    latestGnarId,
    latestAuctionGnarId,
  } = gnarData
  const numericGnarId = parseInt(gnarId)

  const isLatestGnar = gnarId === latestGnarId
  const isLatestAuction = gnarId === latestAuctionGnarId

  return (
    <HStack spacing={1} {...props}>
      <RoundButton
        px={0}
        isDisabled={numericGnarId <= 0}
        onClick={() => push(`/gnar/${numericGnarId - 1}`)}
      >
        ←
      </RoundButton>
      <RoundButton
        px={0}
        isDisabled={isLatestGnar}
        onClick={() => push(`/gnar/${numericGnarId + 1}`)}
      >
        →
      </RoundButton>
      <RoundButton
        isDisabled={isLatestAuction}
        onClick={() => push(`/gnar/${latestAuctionGnarId}`)}
      >
        Latest auction
      </RoundButton>
    </HStack>
  )
}
