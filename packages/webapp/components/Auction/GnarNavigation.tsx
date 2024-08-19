import { FC } from "react";
import { RoundButton } from "../RoundButton";
import { HStack, StackProps } from "@chakra-ui/react";
import { GnarData } from "@hooks/useGnarData";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

export type AuctionNavigationParams = {
  gnarData?: GnarData;
} & StackProps;

export const GnarNavigation: FC<AuctionNavigationParams> = ({ gnarData, ...props }) => {
  const { push } = useRouter();

  if (!gnarData) {
    return (
      <HStack spacing={1} {...props}>
        <RoundButton px={0} isDisabled>
          <HiArrowNarrowLeft />
        </RoundButton>
        <RoundButton px={0} isDisabled>
          <HiArrowNarrowRight />
        </RoundButton>
        <RoundButton px={0} isDisabled>
          Latest auction
        </RoundButton>
      </HStack>
    );
  }

  const {
    gnar: { gnarId },
    latestGnarId,
    latestAuctionGnarId
  } = gnarData;
  const numericGnarId = parseInt(gnarId);

  const isLatestGnar = gnarId === latestGnarId;
  const isLatestAuction = gnarId === latestAuctionGnarId;

  return (
    <HStack spacing={1} {...props}>
      <RoundButton px={0} isDisabled={numericGnarId <= 0} onClick={() => push(`/gnar/${numericGnarId - 1}`)}>
        <HiArrowNarrowLeft />
      </RoundButton>
      <RoundButton px={0} isDisabled={isLatestGnar} onClick={() => push(`/gnar/${numericGnarId + 1}`)}>
        <HiArrowNarrowRight />
      </RoundButton>
      <RoundButton isDisabled={isLatestAuction} onClick={() => push(`/gnar/${latestAuctionGnarId}`)}>
        Latest auction
      </RoundButton>
    </HStack>
  );
};
