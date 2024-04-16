import { ButtonProps } from "@chakra-ui/react"
import { FC } from "react"
import { useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "../../utils/sdk"
import { ContractActionButton } from "../ContractActionButton"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  // TODO: Refactor when sdk updated
  // const { isLoading, write: settle } = useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction()

  return (
    <ContractActionButton isLoading={false} loadingText={"Settling Auction"} onClick={() => { console.log(`SettleAuctionButton clicked`) }} {...props}>
      Settle Auction
    </ContractActionButton>
  )
}
