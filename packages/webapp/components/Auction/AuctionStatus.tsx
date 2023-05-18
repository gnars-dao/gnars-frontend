import { Box, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { truncatedAmount } from "../../utils"
import { AvatarWallet } from "../AvatarWallet"
import { SubtleStackDivider } from "../SubtleStackDivider"
import { Countdown } from "./Countdown"

interface AuctionStatusProps {
  endTimestamp?: number
  auctionEnded: boolean
  isBurned: boolean
  isTreasuryGnar: boolean
  isClaimedGnar: boolean
  latestBid?: string | null
  winner?: string | null
}

export const AuctionStatus: FC<AuctionStatusProps> = ({
  endTimestamp,
  auctionEnded,
  isBurned,
  isTreasuryGnar,
  isClaimedGnar,
  latestBid,
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
          {isBurned || isTreasuryGnar || isClaimedGnar || !latestBid
            ? "N/A"
            : `Ξ ${truncatedAmount(latestBid)}`}
        </Text>
      </VStack>

      <VStack alignItems={"start"}>
        <Text>
          {isBurned
            ? "Outcome"
            : isClaimedGnar
            ? "Winner"
            : auctionEnded
            ? "Winner"
            : "Auction ends in"}
        </Text>
        <Box fontSize={"3xl"} fontWeight={"bold"} lineHeight={1}>
          {isBurned ? (
            <Text>Burned 🔥</Text>
          ) : auctionEnded || !endTimestamp ? (
            !!winner ? (
              <AvatarWallet withLink variant={"delimited"} address={winner} />
            ) : (
              "N/A"
            )
          ) : (
            <Countdown timestamp={endTimestamp} />
          )}
        </Box>
      </VStack>
    </Stack>
  )
}
