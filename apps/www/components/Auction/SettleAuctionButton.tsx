import { FC } from "react"
import { Button, ButtonProps } from "@chakra-ui/react"
import { useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "../../utils/sdk"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  const { isLoading, write } =
    useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction()

  return (
    <Button
      isLoading={isLoading}
      isDisabled={!write}
      onClick={() => write?.()}
      {...props}
    >
      Settle Auction
    </Button>
  )
}
