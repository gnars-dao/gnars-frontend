import { FC, useState } from "react"
import {
  Button,
  ButtonGroup,
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
  Stack,
  StackProps,
  Text,
  useNumberInput,
  useSlider,
} from "@chakra-ui/react"
import {
  useGnarsV2AuctionHouseCreateBid,
  usePrepareGnarsV2AuctionHouseCreateBid,
} from "../../utils/sdk"
import { BigNumber } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { FaCaretDown, FaCaretUp } from "react-icons/all"
import { ConnectKitButton } from "connectkit"

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
  const [treasuryAllocation, setTreasuryAllocation] = useState<number>(90)
  const founderAllocation = 100 - treasuryAllocation
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: bidAmount,
  } = useNumberInput({
    defaultValue: minBidEth,
    min: minBidEth,
    step: minBidEth * 0.05,
    precision: 7,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const { config } = usePrepareGnarsV2AuctionHouseCreateBid({
    args: [BigNumber.from(gnarId), founderAllocation, treasuryAllocation],
    overrides: { value: parseEther(bidAmount) },
  })
  const { isLoading, write } = useGnarsV2AuctionHouseCreateBid(config)

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={4} {...props}>
      <ButtonGroup
        isAttached
        w={{ base: "full", md: "sm", lg: "2xs" }}
        minW={{ base: "full", md: "sm", lg: 60 }}
      >
        <IconButton
          variant={"outline"}
          aria-label={"decrease"}
          icon={<FaCaretDown />}
          size={"lg"}
          w={{ base: 32, sm: "full", md: 48, lg: "initial" }}
          {...dec}
        />

        <InputGroup variant={"outline"} size={"lg"}>
          <Input
            variant={"outline"}
            textAlign={"end"}
            pr={10}
            pl={2}
            borderRadius={0}
            borderX={0}
            {...input}
          />
          <InputRightElement w={10}>Ξ</InputRightElement>
        </InputGroup>
        <IconButton
          variant={"outline"}
          aria-label={"increase"}
          icon={<FaCaretUp />}
          size={"lg"}
          w={{ base: 32, sm: "full", md: 48, lg: "initial" }}
          {...inc}
        />
      </ButtonGroup>

      <Slider
        flexGrow={1}
        aria-label="Founder allocation"
        value={treasuryAllocation}
        onChange={setTreasuryAllocation}
        w={{ base: "full", lg: "3xs" }}
        h={12}
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
          mt={-2}
          fontSize={"2xs"}
        >
          |
        </SliderMark>
        <SliderMark
          value={0}
          top={"70%"}
          fontWeight={"bold"}
          fontSize={9}
          lineHeight={1}
          filter={"opacity(30%)"}
          maxW={"50%"}
        >
          <HStack flexWrap={"wrap"} justifyContent={"start"} gap={1}>
            <Text>FOUNDER</Text>
            <Text marginInline={"0!important"}>{founderAllocation}%</Text>
          </HStack>
        </SliderMark>
        <SliderMark
          value={0}
          lineHeight={1}
          top={"70%"}
          left={"auto!important"}
          right={0}
          fontWeight={"bold"}
          fontSize={9}
          filter={"opacity(30%)"}
          maxW={"50%"}
        >
          <HStack flexWrap={"wrap-reverse"} justifyContent={"end"} gap={1}>
            <Text>{treasuryAllocation}%</Text>
            <Text marginInline={"0!important"}>TREASURY</Text>
          </HStack>
        </SliderMark>
        <SliderTrack />
        <SliderThumb />
      </Slider>

      <ConnectKitButton.Custom>
        {({ isConnected, address, show, isConnecting }) => (
          <Button
            size={"lg"}
            h={12}
            px={10}
            isLoading={isLoading || isConnecting}
            isDisabled={isConnected && !write}
            onClick={isConnected ? write : show}
          >
            Place Bid
          </Button>
        )}
      </ConnectKitButton.Custom>
    </Stack>
  )
}
