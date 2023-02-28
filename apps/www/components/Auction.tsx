import clsx from "clsx"

import {
  getGnartwork,
  is10thGnar,
  isBgDark,
  shortAddress,
  truncatedAmount,
} from "utils"

import Gnar from "./Gnar"
import Menu from "./Menu"
import useGnarInfo, { GnarInfo } from "../hooks/useGnarInfo"
import {
  AspectRatio,
  Box,
  ColorMode,
  ColorModeProvider,
  DarkMode,
  HStack,
  Link,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import { AuctionNavigation } from "./AuctionNavigation"
import Bids from "./Bids"
import { useRouter } from "next/router"
import { TREASURY_ADDRESS, V2_START_ID } from "../utils/contracts"
import { AvatarWallet } from "./AvatarWallet"
import { ShredIcon } from "./Icons"
import { HiExternalLink } from "react-icons/all"
import useAuctionTimeLeft from "../hooks/useAuctionTimeLeft"
import { useNnsNameWithEnsFallback } from "../hooks/useNnsNameWithEnsFallback"
import { FC } from "react"

interface AuctionProps {
  desiredGnarId?: number
  initialGnarInfo: GnarInfo
}

const Auction: FC<AuctionProps> = ({ desiredGnarId, initialGnarInfo }) => {
  const {
    data: {
      latestGnarId,
      gnar: {
        gnarId,
        seed,
        owner,
        isLatestGnar,
        isOg,
        auction: { endTimestamp, latestBidder, latestBid, settled },
      },
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

  const auctionTimeLeft = useAuctionTimeLeft(endTimestamp)

  const { data: ownerName } = useNnsNameWithEnsFallback(owner)

  const auctionEnded = auctionTimeLeft === null
  const isTreasuryGnar = is10thGnar(gnarId)
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = auctionEnded && !winner
  const { colorMode } = useColorMode()

  const divider = useBreakpointValue({
    md: (
      <StackDivider
        borderColor={colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300"}
      />
    ),
  })

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
          <HStack bgColor={gnarBgColor} flex={1} justifyContent={"center"}>
            <AspectRatio ratio={1 / 1} w={"full"} maxW={"570px"}>
              <Gnar gnarId={`${gnarId}`} isOg={isOg} gnartwork={gnartwork} />
            </AspectRatio>
          </HStack>
          <ColorModeProvider value={auctionDetailsColorMode}>
            <Box
              flex={1}
              bgColor={{ base: undefined, lg: gnarBgColor }}
              pt={{ base: 20, lg: "5%" }}
            >
              <VStack
                color={"chakra-body-text"}
                justifyContent={"start"}
                alignItems={"start"}
                w={"full"}
                h={"full"}
                maxW={{ base: "full", lg: "lg" }}
                px={{ base: 4, sm: 10, lg: 0 }}
              >
                <AuctionNavigation
                  gnarId={numericGnarId}
                  latestGnarId={latestGnarId}
                  isLatestGnar={isLatestGnar}
                />
                <div className="font-secondary text-5xl sm:text-7xl">
                  <HStack>
                    {isOg && <Text>OG</Text>}
                    {gnarId ? <Text>Gnar {gnarId}</Text> : <Spinner />}
                  </HStack>
                </div>
                <div className="pt-6">
                  <VStack alignItems={"start"} spacing={6}>
                    <Stack
                      spacing={10}
                      direction={{ base: "column", md: "row" }}
                      divider={divider}
                      justifyItems={"start"}
                      alignItems={"start"}
                    >
                      <VStack alignItems={"start"}>
                        <Text>
                          {auctionEnded ? "Winning bid" : "Current bid"}
                        </Text>
                        <Text
                          fontSize={"4xl"}
                          fontWeight={"bold"}
                          lineHeight={1}
                        >
                          {isBurned || isTreasuryGnar
                            ? "N/A"
                            : `Ξ ${truncatedAmount(latestBid)}`}
                        </Text>
                      </VStack>

                      <VStack alignItems={"start"}>
                        <Text>
                          {isBurned
                            ? "Outcome"
                            : auctionEnded
                            ? "Winner"
                            : "Auction ends in"}
                        </Text>
                        <Text
                          fontSize={"4xl"}
                          fontWeight={"bold"}
                          lineHeight={1}
                        >
                          {isBurned ? (
                            "Burned 🔥"
                          ) : !!winner ? (
                            <AvatarWallet
                              variant={"delimited"}
                              address={winner}
                            />
                          ) : (
                            "N/A"
                          )}
                        </Text>
                      </VStack>
                    </Stack>
                    {settled && !isBurned && (
                      <HStack
                        spacing={1}
                        fontSize={"lg"}
                        color={"chakra-body-text"}
                      >
                        <ShredIcon />
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
                  </VStack>
                </div>
                {isLatestGnar ? (
                  <div>
                    {" "}
                    <Bids />
                  </div>
                ) : !isOg && is10thGnar(gnarId) ? (
                  <Text className="text-16px mt-10 pb-4 border-b border-secondaryText">
                    To pay homage and show our respect as a Nouns extension,
                    every Gnar ending in 7 is reserved for onboarding shredders.
                  </Text>
                ) : null}
                <div>
                  {/* {display_gnarId === currentGnarId ? <BidHistory /> : <BidPast />} */}
                </div>
              </VStack>
            </Box>
          </ColorModeProvider>
        </Stack>
      </Box>
    </ColorModeProvider>
  )
}
export default Auction
