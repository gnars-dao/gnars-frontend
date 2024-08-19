import { Box, Stack, StackProps, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { truncatedAmount } from "../../utils";
import { AvatarWallet } from "../AvatarWallet";
import { Countdown } from "./Countdown";

interface AuctionStatusProps extends StackProps {
  endTimestamp?: number;
  auctionEnded: boolean;
  isBurned: boolean;
  isTreasuryGnar: boolean;
  isClaimedGnar: boolean;
  latestBid?: string | null;
  winner?: string | null;
}

export const AuctionStatus: FC<AuctionStatusProps> = ({
  endTimestamp,
  auctionEnded,
  isBurned,
  isTreasuryGnar,
  isClaimedGnar,
  latestBid,
  winner,
  ...props
}) => {
  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      justifyItems={["center", "start"]}
      justifyContent={["center", "space-between"]}
      alignItems={["center", "start"]}
      {...props}
    >
      <VStack alignItems={["center", "start"]} flexShrink={0}>
        <Text>{auctionEnded ? "Winning bid" : "Current bid"}</Text>
        <Text fontSize={"3xl"} fontWeight={"bold"} lineHeight={1}>
          {isBurned || isTreasuryGnar || isClaimedGnar || !latestBid ? "N/A" : `Ξ ${truncatedAmount(latestBid)}`}
        </Text>
      </VStack>

      <VStack alignItems={["center", "start"]} alignSelf={["center", "end"]}>
        <Text>{isBurned ? "Outcome" : isClaimedGnar ? "Winner" : auctionEnded ? "Winner" : "Auction ends in"}</Text>
        <Box fontSize={["2xl", "3xl"]} fontWeight={"bold"} lineHeight={1}>
          {isBurned ? (
            <Text>Burned 🔥</Text>
          ) : auctionEnded || !endTimestamp ? (
            !!winner ? (
              <AvatarWallet address={winner} />
            ) : (
              "N/A"
            )
          ) : (
            <Countdown timestamp={endTimestamp} />
          )}
        </Box>
      </VStack>
    </Stack>
  );
};
