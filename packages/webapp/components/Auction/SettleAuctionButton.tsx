import { ButtonProps } from "@chakra-ui/react"
import { FC } from "react"
import { mainnet } from "wagmi/chains"
import { useGnarsV2AuctionHouseSettleCurrentAndCreateNewAuction } from "../../utils/sdk"
import { ContractActionButton } from "../ContractActionButton"

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
      onClick={() => settle?.()}
      {...props}
    >
      Settle Auction
    </ContractActionButton>
  )
}
