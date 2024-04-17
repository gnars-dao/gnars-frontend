import { ButtonProps } from "@chakra-ui/react"
import { FC } from "react"
import { useWriteGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "../../utils/sdk"
import { ContractActionButton } from "../ContractActionButton"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  // TODO: Refactor when sdk updated
  const { isPending, isError, isSuccess, writeContract: settle } = useWriteGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction()

  return (
    <ContractActionButton isLoading={isPending} loadingText={"Settling Auction"} onClick={() => { /*settle*/ /* TODO: settle contract */ }} {...props}>
      Settle Auction
    </ContractActionButton>
  )
}
