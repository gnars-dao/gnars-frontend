import { FC } from "react"
import { Box, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { SubtleStackDivider } from "../SubtleStackDivider"
import { truncatedAmount } from "../../utils"
import { AvatarWallet } from "./AvatarWallet"

interface AuctionStatusProps {
  auctionEnded: boolean
  auctionTimeLeft: string | null
  burned: boolean
  isTreasuryGnar: boolean
  isClaimedGnar: boolean
  amount: string
  winner?: string
}

export const AuctionStatus: FC<AuctionStatusProps> = ({
  auctionEnded,
  auctionTimeLeft,
  burned,
  isTreasuryGnar,
  isClaimedGnar,
  amount,
  winner,
}) => {
  const divider = useBreakpointValue({
    md: <SubtleStackDivider />,
  })

  return (
    <Stack
      spacing={10}
      direction={{ base: "column", md: "row" }}
      divider={divider}
      justifyItems={"start"}
      alignItems={"start"}
    >
      <VStack alignItems={"start"}>
        <Text>{auctionEnded ? "Winning bid" : "Current bid"}</Text>
        <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={1}>
          {burned || isTreasuryGnar || isClaimedGnar
            ? "N/A"
            : `Ξ ${truncatedAmount(amount)}`}
        </Text>
      </VStack>

      <VStack alignItems={"start"}>
        <Text>
          {burned
            ? "Outcome"
            : isClaimedGnar
            ? "Winner"
            : auctionEnded
            ? "Winner"
            : "Auction ends in"}
        </Text>
        <Box fontSize={"3xl"} fontWeight={"bold"} lineHeight={1}>
          {burned ? (
            <Text>Burned 🔥</Text>
          ) : auctionEnded ? (
            !!winner ? (
              <AvatarWallet withLink variant={"delimited"} address={winner} />
            ) : (
              "N/A"
            )
          ) : (
            <Text>{auctionTimeLeft}</Text>
          )}
        </Box>
      </VStack>
    </Stack>
  )
}
