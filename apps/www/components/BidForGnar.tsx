import { FC, useState } from "react"
import {
  Button,
  ButtonProps,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  StackProps,
  useNumberInput,
  useSlider
} from "@chakra-ui/react"
import {
  useGnarsV2AuctionHouseCreateBid,
  usePrepareGnarsV2AuctionHouseCreateBid
} from "../utils/sdk"
import { BigNumber } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { FaCaretDown, FaCaretUp } from "react-icons/all"

const minBidIncrementPercentage = 5

export type BidForGnarProps = {
  gnarId: string
  currentBid: string
} & StackProps
export const BidForGnar: FC<BidForGnarProps> = ({
  gnarId,
  currentBid,
  ...props
}) => {
  const minBid = BigNumber.from(currentBid)
    .mul(minBidIncrementPercentage)
    .div(100)
    .add(currentBid)

  const minBidEth = parseFloat(formatEther(minBid))
  const [treasuryAllocation, setTreasuryAllocation] = useState<number>(50)
  const founderAllocation = 100 - treasuryAllocation
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: bidAmount
  } = useNumberInput({
    defaultValue: minBidEth,
    min: minBidEth,
    step: minBidEth * 0.05,
    precision: 7
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const { config } = usePrepareGnarsV2AuctionHouseCreateBid({
    args: [BigNumber.from(gnarId), founderAllocation, treasuryAllocation],
    overrides: { value: parseEther(bidAmount) }
  })
  const { isLoading, write } = useGnarsV2AuctionHouseCreateBid(config)

  return (
    <HStack spacing={4} {...props}>
      <HStack w="sm" spacing={1}>
        <IconButton
          aria-label={"decrease"}
          icon={<FaCaretDown />}
          size={"lg"}
          {...dec}
        />

        <InputGroup size={"lg"}>
          <Input {...input} />
          <InputRightElement>Ξ</InputRightElement>
        </InputGroup>
        <IconButton
          aria-label={"increase"}
          icon={<FaCaretUp />}
          size={"lg"}
          {...inc}
        />
      </HStack>

      <Slider
        flexGrow={1}
        aria-label="Founder allocation"
        value={treasuryAllocation}
        onChange={setTreasuryAllocation}
        w={"3xs"}
        h={"full"}
        pt={0}
      >
        <SliderMark
          value={0}
          w={"full"}
          textAlign={"center"}
          top={0}
          fontWeight={"bold"}
          fontSize="xs"
          filter={"opacity(75%)"}
        >
          BID ALLOCATION
        </SliderMark>
        <SliderMark
          value={0}
          top={"50%"}
          w={"full"}
          textAlign={"center"}
          mt={-3}
        >
          |
        </SliderMark>
        <SliderMark
          value={0}
          bottom={0}
          fontWeight={"bold"}
          fontSize="2xs"
          filter={"opacity(30%)"}
        >
          FOUNDER
        </SliderMark>
        <SliderMark
          value={0}
          bottom={0}
          left={"auto!important"}
          right={0}
          fontWeight={"bold"}
          fontSize="2xs"
          filter={"opacity(30%)"}
        >
          TREASURY
        </SliderMark>
        <SliderTrack />
        <SliderThumb />
      </Slider>

      <Button
        size={"lg"}
        h={"full"}
        // isLoading={isLoading}
        // isDisabled={!write}
        // onClick={write}
      >
        Place Bid
      </Button>
    </HStack>
  )
}
