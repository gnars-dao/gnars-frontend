import { FC } from "react"
import { Button, ButtonProps } from "@chakra-ui/react"
import {
  useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction,
  usePrepareGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction,
} from "../../utils/sdk"
import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit"
import { ContractActionButton } from "../ContractActionButton"
import { mainnet } from "wagmi/chains"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  const { config } =
    usePrepareGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction({
      chainId: mainnet.id,
    })
  const { isLoading, write } =
    useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction(config)

  return (
    <ContractActionButton
      isLoading={isLoading}
      loadingText={"Settling Auction"}
      isDisabled={!write}
      onClick={() => write?.()}
      {...props}
    >
      Settle Auction
    </ContractActionButton>
  )
}
