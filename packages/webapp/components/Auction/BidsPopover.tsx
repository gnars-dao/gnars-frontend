import { Bid } from "../../hooks/useGnarInfo"
import { FC } from "react"
import {
  Button,
  DarkMode,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import { RiAuctionLine } from "react-icons/all"
import { BidsTable } from "./BidsTable"

export type BidsPopoverProps = {
  bids: Bid[]
}
export const BidsPopover: FC<BidsPopoverProps> = ({ bids }) => (
  <Popover>
    <PopoverTrigger>
      <Button leftIcon={<RiAuctionLine />} variant={"outline"}>
        {bids.length} Bid{bids.length > 1 && "s"}
      </Button>
    </PopoverTrigger>
    <DarkMode>
      <PopoverContent minWidth={"400px"} textColor={"chakra-body-text"}>
        <PopoverArrow />
        <PopoverBody p={0}>
          <BidsTable bids={bids} borderWidth={0} />
        </PopoverBody>
      </PopoverContent>
    </DarkMode>
  </Popover>
)
