import { FC } from "react"
import { Button, ButtonProps } from "@chakra-ui/react"
import { useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "../../utils/sdk"
import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  const { isLoading, write } =
    useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, show, isConnecting }) => (
        <Button
          isLoading={isConnecting || isLoading}
          isDisabled={!write}
          onClick={isConnected ? () => write?.() : show}
          {...props}
        >
          Settle Auction
        </Button>
      )}
    </ConnectKitButton.Custom>
  )
}
