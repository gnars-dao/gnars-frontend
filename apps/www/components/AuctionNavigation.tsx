import { FC } from "react"
import { useRouter } from "next/router"
import { HStack } from "@chakra-ui/react"
import { RoundButton } from "./RoundButton"

export interface AuctionNavigationParams {
  gnarId: number
  latestGnarId: string
  isLatestGnar: boolean
}

export const AuctionNavigation: FC<AuctionNavigationParams> = ({
  gnarId,
  isLatestGnar,
  latestGnarId,
}) => {
  const { push } = useRouter()

  return (
    <HStack spacing={1}>
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
        isDisabled={isLatestGnar}
        onClick={() => push(`/gnar/${latestGnarId}`)}
      >
        Latest auction
      </RoundButton>
    </HStack>
  )
}
