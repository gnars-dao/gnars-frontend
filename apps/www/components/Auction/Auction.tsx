import { getGnartwork, is10thGnar, isBgDark, shortAddress } from "utils"

import Gnar from "../Gnar"
import Menu from "../Menu"
import useGnarInfo, { GnarInfo } from "../../hooks/useGnarInfo"
import {
  AspectRatio,
  Box,
  Button,
  ColorMode,
  ColorModeProvider,
  HStack,
  IconButton,
  Link,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { AuctionNavigation } from "./AuctionNavigation"
import { TREASURY_ADDRESS, V2_GNAR_ADDRESS } from "../../utils/contracts"
import { EtherscanIcon, OGNogglesIcon, ShredIcon } from "../Icons"
import { FiInfo, HiExternalLink, RiVipCrownFill } from "react-icons/all"
import useAuctionTimeLeft from "../../hooks/useAuctionTimeLeft"
import { useNnsNameWithEnsFallback } from "../../hooks/useNnsNameWithEnsFallback"
import { FC } from "react"
import { BiddingAndSettlingInfo } from "./BiddingAndSettlingInfo"
import { AuctionStatus } from "./AuctionStatus"
import { SettleAuctionButton } from "./SettleAuctionButton"
import { BidsTable } from "./BidsTable"
import { BidForGnar } from "./BidForGnar"
import { BidsPopover } from "./BidsPopover"

interface AuctionProps {
  desiredGnarId?: number
  initialGnarInfo: GnarInfo
}

const Auction: FC<AuctionProps> = ({ desiredGnarId, initialGnarInfo }) => {
  const {
    data: {
      latestGnarId,
      gnar: { gnarId, seed, owner, isLatestGnar, isOg, auction },
    },
  } = useGnarInfo(desiredGnarId, initialGnarInfo)

  const numericGnarId = parseInt(gnarId)

  const gnartwork = getGnartwork(isOg, seed)

  const hasDarkBg = isBgDark(gnartwork?.background)
  const auctionDetailsColorMode = useBreakpointValue<ColorMode>({
    base: "dark",
    lg: hasDarkBg ? "dark" : "light",
  })
  const gnarBgColor = gnartwork?.background
    ? `#${gnartwork.background}`
    : "#d5d7e1"

  const { endTimestamp, latestBidder, latestBid, settled, bids } = {
    ...(auction ?? {}),
  }

  // @TODO show how many auctions are left until next gnarving

  const auctionTimeLeft = useAuctionTimeLeft(endTimestamp)

  const { data: ownerName } = useNnsNameWithEnsFallback(owner)

  const auctionEnded = auctionTimeLeft === null
  const isTreasuryGnar = is10thGnar(gnarId)
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = auction && auctionEnded && !winner

  return (
    <ColorModeProvider value={hasDarkBg ? "dark" : "light"}>
      <Box
        color={"chakra-body-text"}
        className={"flex flex-col w-full items-center"}
      >
        <Menu bgColor={gnarBgColor} />
        <Stack
          w={"full"}
          h={"fit-content"}
          direction={{ base: "column", lg: "row" }}
          spacing={0}
        >
          <HStack bgColor={gnarBgColor} flex={"auto"} justifyContent={"center"}>
            <AspectRatio ratio={1 / 1} w={"full"} maxW={"570px"}>
              <Gnar gnarId={`${gnarId}`} isOg={isOg} gnartwork={gnartwork} />
            </AspectRatio>
          </HStack>
          <ColorModeProvider value={auctionDetailsColorMode}>
            <VStack
              color={"chakra-body-text"}
              alignItems={"start"}
              flex={1}
              bgColor={{ base: undefined, lg: gnarBgColor }}
              pt={{ base: 20, lg: "2%" }}
              px={{ base: 6, lg: 0 }}
            >
              <VStack
                w={"full"}
                alignItems={"start"}
                spacing={6}
                maxW={{ base: "full", lg: "500px", xl: "xl" }}
              >
                <Wrap
                  color={"chakra-body-text"}
                  w={"full"}
                  justify={"space-between"}
                  spacing={6}
                  overflow={"visible"}
                >
                  <WrapItem>
                    <HStack
                      lineHeight={"80%"}
                      fontFamily={`"Londrina Solid", sans-serif`}
                      fontSize={{ base: "5xl", xl: "6xl" }}
                    >
                      {/*@TODO add OG crown*/}
                      {isOg && <Text position={"relative"}>OG</Text>}
                      {gnarId ? <Text>Gnar {gnarId}</Text> : <Spinner />}
                    </HStack>
                  </WrapItem>
                  <WrapItem alignSelf={"end"}>
                    <AuctionNavigation
                      gnarId={numericGnarId}
                      latestGnarId={latestGnarId}
                      isLatestGnar={isLatestGnar}
                    />
                  </WrapItem>
                </Wrap>
                <VStack alignItems={"start"} spacing={10} w={"full"}>
                  <AuctionStatus
                    auctionTimeLeft={auctionTimeLeft}
                    auctionEnded={auctionEnded}
                    burned={isBurned}
                    isTreasuryGnar={isTreasuryGnar}
                    amount={latestBid}
                    winner={winner}
                  />
                  {(isTreasuryGnar || isOg) && (
                    <VStack alignItems={"start"} spacing={1}>
                      <Text fontSize={"md"} lineHeight={1.1}>
                        <FiInfo
                          style={{
                            verticalAlign: "text-bottom",
                            display: "inline",
                          }}
                        />{" "}
                        {isTreasuryGnar && (
                          <>
                            To pay homage and show our respect as a Nouns
                            extension, every Gnar ending in 7 is reserved for
                            onboarding shredders.
                          </>
                        )}
                        {isOg && (
                          <>
                            OG Gnars dropped before Gnars was officially a DAO,
                            and have no voting power. Each OG Gnar entitled it's
                            holder to claim 2 Gnars.
                          </>
                        )}
                      </Text>
                    </VStack>
                  )}
                  {(!auction || (auction && settled)) && !isBurned && (
                    <HStack
                      spacing={1}
                      fontSize={"lg"}
                      color={"chakra-body-text"}
                      fontWeight={"semibold"}
                    >
                      {isOg ? <OGNogglesIcon /> : <ShredIcon />}
                      <Text>Owned by </Text>
                      <Link
                        isExternal
                        href={`https://etherscan.io/address/${owner}`}
                      >
                        {ownerName ?? shortAddress(owner)}
                        <HiExternalLink
                          style={{ display: "inline", marginBottom: "2px" }}
                        />
                      </Link>
                    </HStack>
                  )}
                  {auction && !settled && (
                    <VStack w={"full"} alignItems={"start"} spacing={1}>
                      {auctionEnded ? (
                        <SettleAuctionButton size={"lg"} w={"full"} />
                      ) : (
                        <BidForGnar
                          gnarId={gnarId}
                          currentBid={latestBid}
                          w={"full"}
                        />
                      )}
                      <BiddingAndSettlingInfo />
                      {bids?.length > 0 && (
                        <VStack w="full" alignItems={"end"} spacing={1}>
                          <Text fontSize={"sm"}>
                            {bids.length} Bid{bids.length > 1 && "s"}
                          </Text>
                          <BidsTable
                            bids={bids}
                            w={"full"}
                            overflow={"scroll"}
                            flexGrow={1}
                            maxH={"180px"}
                          />
                        </VStack>
                      )}
                    </VStack>
                  )}
                </VStack>
                {/*@TODO prevent flashing bid when cached auction was already settled*/}
                {(!auction || settled) && (
                  <HStack>
                    {bids && bids.length > 0 && <BidsPopover bids={bids} />}
                    <Link
                      isExternal
                      href={`https://etherscan.io/token/${V2_GNAR_ADDRESS}?a=${gnarId}`}
                    >
                      <IconButton
                        aria-label={"Etherscan"}
                        variant={"outline"}
                        icon={<EtherscanIcon />}
                      />
                    </Link>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </ColorModeProvider>
        </Stack>
      </Box>
    </ColorModeProvider>
  )
}
export default Auction
