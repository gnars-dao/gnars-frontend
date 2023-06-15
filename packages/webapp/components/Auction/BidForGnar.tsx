import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  StackProps,
  Text,
  useNumberInput,
} from "@chakra-ui/react"
import { BigNumber } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"
import { FC, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { mainnet } from "wagmi/chains"
import { useGnarsV2AuctionHouseCreateBid } from "../../utils/sdk"
import { ContractActionButton } from "../ContractActionButton"

const minBidIncrementPercentage = 5

export type BidForGnarProps = {
  gnarId: string
  latestBid?: string | null
} & StackProps
export const BidForGnar: FC<BidForGnarProps> = ({
  gnarId,
  latestBid,
  ...props
}) => {
  const RESERVE_PRICE = parseEther("0.01") // @TODO add this info to the subgraph so it's always up-to-date
  const currentBid = latestBid ?? "0"
  const incrementedBid = BigNumber.from(currentBid)
    .mul(minBidIncrementPercentage)
    .div(100)
    .add(currentBid)
  const minBid = incrementedBid.gt(RESERVE_PRICE)
    ? incrementedBid
    : RESERVE_PRICE

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
    id: "bid-input",
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const isValidBid = BigNumber.from(parseEther(bidAmount)).gte(minBid)

  const { isLoading, write: placeBid } = useGnarsV2AuctionHouseCreateBid({
    mode: "recklesslyUnprepared",
    args: [BigNumber.from(gnarId), founderAllocation, treasuryAllocation],
    overrides: {
      value: parseEther(bidAmount),
      gasLimit: BigNumber.from(100_000), // to prevent out of gas errors with auction extensions
    },
    chainId: mainnet.id,
  })

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
            isInvalid={!isValidBid}
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
          top={"75%"}
          fontWeight={"bold"}
          fontSize={9}
          lineHeight={0.5}
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
          lineHeight={0.5}
          top={"75%"}
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

      <ContractActionButton
        size={"lg"}
        h={12}
        px={10}
        isLoading={isLoading}
        loadingText={"Bidding"}
        isDisabled={!isValidBid}
        onClick={() => placeBid()}
      >
        {!isValidBid ? "Bid too low" : "Place Bid"}
      </ContractActionButton>
    </Stack>
  )
}
