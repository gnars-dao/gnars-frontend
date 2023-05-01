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
  const { isLoading, write: settle } =
    useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction({
      mode: "recklesslyUnprepared",
      chainId: mainnet.id,
    })

  return (
    <ContractActionButton
      isLoading={isLoading}
      loadingText={"Settling Auction"}
      onClick={() => settle()}
      {...props}
    >
      Settle Auction
    </ContractActionButton>
  )
}
