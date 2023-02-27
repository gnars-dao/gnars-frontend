import useAuctionTimeLeft from "hooks/useAuctionTimeLeft"
import useGnarInfo from "hooks/useGnarInfo"
import { ensOrShortAddress, is10thGnar, truncatedAmount } from "utils"
import { TREASURY_ADDRESS } from "utils/contracts"
import { FC } from "react"
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback"
import { AvatarWallet } from "./AvatarWallet"
import {
  Divider,
  Stack,
  StackDivider,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react"

interface TimeCounterProps {
  desiredGnarId?: number
}

export const AuctionStatus: FC<TimeCounterProps> = ({ desiredGnarId }) => {
  const {
    isLoading,
    data: {
      gnar: { auction, gnarId, isLatestGnar, isOg },
    },
  } = useGnarInfo(desiredGnarId)

  const { endTimestamp, latestBidder, latestBid } = { ...auction }
  const auctionTimeLeft = useAuctionTimeLeft(endTimestamp)

  const auctionEnded = auctionTimeLeft === null
  const isTreasuryGnar = is10thGnar(gnarId)
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = auctionEnded && !winner
  const { colorMode } = useColorMode()
  const divider = useBreakpointValue({
    md: (
      <StackDivider
        borderColor={colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300"}
      />
    ),
  })

  if (isLoading)
    return (
      <div className="text-lg text-secondaryText lg:dark:text-white font-bold whitespace-nowrap">
        Loading…
      </div>
    )

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
        <Text fontSize={"4xl"} fontWeight={"bold"} lineHeight={1}>
          {isBurned || isTreasuryGnar
            ? "N/A"
            : `Ξ ${truncatedAmount(latestBid)}`}
        </Text>
      </VStack>

      <VStack alignItems={"start"}>
        <Text>
          {isBurned ? "Outcome" : auctionEnded ? "Winner" : "Auction ends in"}
        </Text>
        <Text fontSize={"4xl"} fontWeight={"bold"} lineHeight={1}>
          {isBurned ? (
            "Burned 🔥"
          ) : !!winner ? (
            <AvatarWallet variant={"delimited"} address={winner} />
          ) : (
            "N/A"
          )}
        </Text>
      </VStack>
    </Stack>
    // <div className="flex flex-col lg:flex-row">
    //
    //   <VStack alignItems={"start"}>
    //     <div className="text-lg font-medium whitespace-nowrap">
    //       {auctionEnded ? "Winning bid" : "Current bid"}
    //     </div>
    //     <Text lineHeight={1}>
    //       {isBurned || isTreasuryGnar
    //         ? "N/A"
    //         : `Ξ ${truncatedAmount(latestBid)}`}
    //     </Text>
    //   </VStack>
    //   <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:pl-10">
    //     <div className="text-lg font-medium">
    //       {auctionEnded ? "Winner" : "Auction ends in"}
    //     </div>
    //     <div className="text-32px font-medium pt-1 text-right lg:text-left">
    //       {isBurned ? (
    //         "Burned"
    //       ) : (
    //         <AvatarWallet variant={"delimited"} address={winner} />
    //       )}
    //     </div>
    //   </div>
    // </div>
  )
}
