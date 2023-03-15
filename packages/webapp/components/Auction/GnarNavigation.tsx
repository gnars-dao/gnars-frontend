import { FC } from "react"
import { useRouter } from "next/router"
import { HStack, StackProps } from "@chakra-ui/react"
import { RoundButton } from "../RoundButton"

export type AuctionNavigationParams = {
  gnarId: number
  latestGnarId: string
  latestAuctionGnarId: string
} & StackProps

export const GnarNavigation: FC<AuctionNavigationParams> = ({
  gnarId,
  latestGnarId,
  latestAuctionGnarId,
  ...props
}) => {
  const { push } = useRouter()
  const isLatestGnar = `${gnarId}` === latestGnarId
  const isLatestAuction = `${gnarId}` === latestAuctionGnarId

  return (
    <HStack spacing={1} {...props}>
      <RoundButton
        px={0}
        isDisabled={gnarId <= 0}
        onClick={() => push(`/gnar/${gnarId - 1}`)}
      >
        ←
      </RoundButton>
      <RoundButton
        px={0}
        isDisabled={isLatestGnar}
        onClick={() => push(`/gnar/${gnarId + 1}`)}
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
