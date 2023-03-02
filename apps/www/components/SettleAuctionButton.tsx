import { FC } from "react"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { gnarsV2AuctionHouseABI } from "../utils/abis"
import { Button, ButtonProps } from "@chakra-ui/react"

export type SettleAuctionButtonProps = ButtonProps
export const SettleAuctionButton: FC<SettleAuctionButtonProps> = (props) => {
  const { config } = usePrepareContractWrite({
    address: "0xC28e0d3c00296dD8c5C3F2E9707361920f92a209",
    abi: gnarsV2AuctionHouseABI,
    functionName: "settleCurrentAndCreateNewAuction",
  })

  const { isLoading, isSuccess, write } = useContractWrite(config)

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
