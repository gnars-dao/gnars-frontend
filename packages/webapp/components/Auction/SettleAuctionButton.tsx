import { FC } from "react";
import { useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "utils/sdk";
import { ContractActionButton } from "../ContractActionButton";
import { ButtonProps } from "@chakra-ui/react";

export type SettleAuctionButtonProps = ButtonProps;
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  const { isLoading, write: settle } = useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction();

  return (
    <ContractActionButton isLoading={isLoading} loadingText={"Settling Auction"} onClick={() => settle?.()} {...props}>
      Settle Auction
    </ContractActionButton>
  );
};
