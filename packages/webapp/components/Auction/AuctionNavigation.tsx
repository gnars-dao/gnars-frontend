import { FC } from "react"
import { useRouter } from "next/router"
import { HStack, StackProps } from "@chakra-ui/react"
import { RoundButton } from "../RoundButton"

export type AuctionNavigationParams = {
  gnarId: number
  latestGnarId: string
  isLatestGnar: boolean
} & StackProps

export const AuctionNavigation: FC<AuctionNavigationParams> = ({
  gnarId,
  isLatestGnar,
  latestGnarId,
  ...props
}) => {
  const { push } = useRouter()

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
        isDisabled={isLatestGnar}
        onClick={() => push(`/gnar/${latestGnarId}`)}
      >
        Latest auction
      </RoundButton>
    </HStack>
  )
}
