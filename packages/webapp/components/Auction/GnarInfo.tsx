import {
  HStack,
  IconButton,
  Link,
  Spinner,
  StackProps,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { isPast } from "date-fns"
import { FC, useEffect, useState } from "react"
import { FiInfo } from "react-icons/fi"
import { HiExternalLink } from "react-icons/hi"
import { GnarData } from "../../hooks/useGnarData"
import { useNnsNameWithEnsFallback } from "../../hooks/useNnsNameWithEnsFallback"
import { is10thGnar, shortAddress } from "../../utils"
import {
  OG_GNAR_ADDRESS,
  TREASURY_ADDRESS,
  V2_GNAR_ADDRESS,
} from "../../utils/contracts"
import { EtherscanIcon, OGNogglesIcon, ShredIcon } from "../Icons"
import { AuctionStatus } from "./AuctionStatus"
import { BiddingAndSettlingInfo } from "./BiddingAndSettlingInfo"
import { BidForGnar } from "./BidForGnar"
import { BidsPopover } from "./BidsPopover"
import { BidsTable } from "./BidsTable"
import { GnarNavigation } from "./GnarNavigation"
import { GnarvingTracker } from "./GnarvingTracker"
import { SettleAuctionButton } from "./SettleAuctionButton"

interface GnarInfoProps extends StackProps {
  isOg: boolean
  gnarData: GnarData
}

export const GnarInfo: FC<GnarInfoProps> = ({
  isOg,
  gnarData,
  ...props
}: GnarInfoProps) => {
  const { endTimestamp, latestBidder, latestBid, settled, bids } = {
    ...(gnarData.gnar.auction ?? {}),
  }

  const { block } = gnarData

  const [blockTimestamp, setBlockTimestamp] = useState<
    number | null | undefined
  >(block?.timestamp)

  useEffect(() => {
    // sometimes the timestamp of new blocks is null. In that case, we keep the last known timestamp
    // the next refetch should update it
    if (block?.timestamp) {
      setBlockTimestamp(block.timestamp)
    }
  }, [block?.timestamp])

  // @TODO show how many auctions are left until next gnarving
  // @TODO add slide animation when changing Gnar
  // @TODO add fake loader like https://github.com/rstacruz/nprogress

  const { data: ownerName } = useNnsNameWithEnsFallback(gnarData.gnar.owner)

  const auctionEnded =
    endTimestamp && blockTimestamp
      ? isPast(new Date(endTimestamp * 1000)) && blockTimestamp > endTimestamp
      : true

  const isTreasuryGnar = is10thGnar(parseInt(gnarData.gnar.gnarId))
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = !!gnarData.gnar.auction && auctionEnded && !winner
  const isClaimedGnar = !isTreasuryGnar && !gnarData.gnar.auction
  return (
    <VStack
      w={"full"}
      alignItems={"start"}
      spacing={6}
      maxW={{ base: "full", lg: "500px", xl: "xl" }}
      {...props}
    >
      <GnarvingTracker gnarvingData={gnarData.gnarving} w={"full"} />
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
            {gnarData ? <Text>Gnar {gnarData.gnar.gnarId}</Text> : <Spinner />}
          </HStack>
        </WrapItem>
        <WrapItem alignSelf={"end"}>
          <GnarNavigation gnarData={gnarData} />
        </WrapItem>
      </Wrap>
      <VStack alignItems={"start"} spacing={10} w={"full"}>
        <AuctionStatus
          endTimestamp={endTimestamp}
          auctionEnded={auctionEnded}
          isBurned={isBurned}
          isTreasuryGnar={isTreasuryGnar}
          isClaimedGnar={isClaimedGnar}
          latestBid={latestBid}
          winner={winner}
        />
        {(isTreasuryGnar || isOg || isClaimedGnar) && (
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
                  To pay homage and show our respect as a Nouns extension, every
                  Gnar ending in 7 is reserved for onboarding shredders.
                </>
              )}
              {isClaimedGnar && (
                <>
                  When Gnars DAO was launched, holders of OG Gnars were able to
                  claim 2 Gnars per OG Gnar held, as a way to give them voting
                  power in the governance. This Gnar was claimed that way.
                </>
              )}
              {isOg && (
                <>
                  OG Gnars dropped before Gnars was officially a DAO, and have
                  no voting power. Each OG Gnar entitled its holder to claim 2
                  Gnars.
                </>
              )}
            </Text>
          </VStack>
        )}
        {(!gnarData.gnar.auction || (gnarData.gnar.auction && settled)) &&
          !isBurned && (
            <HStack
              spacing={1}
              fontSize={"lg"}
              color={"chakra-body-text"}
              fontWeight={"semibold"}
            >
              {isOg || isClaimedGnar ? <OGNogglesIcon /> : <ShredIcon />}
              <Text>Owned by </Text>
              <Link
                isExternal
                href={`https://etherscan.io/address/${gnarData.gnar.owner}`}
              >
                {ownerName ?? shortAddress(gnarData.gnar.owner)}
                <HiExternalLink
                  style={{ display: "inline", marginBottom: "2px" }}
                />
              </Link>
            </HStack>
          )}
        {gnarData.gnar.auction && !settled && (
          <VStack w={"full"} alignItems={"start"} spacing={1}>
            {auctionEnded ? (
              <SettleAuctionButton size={"lg"} w={"full"} />
            ) : (
              <BidForGnar
                gnarId={gnarData.gnar.gnarId}
                latestBid={latestBid}
                w={"full"}
              />
            )}
            <BiddingAndSettlingInfo />
            {bids?.length && bids.length > 0 && (
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
      {gnarData && (!gnarData.gnar.auction || settled) && (
        <HStack>
          {bids && bids.length > 0 && <BidsPopover bids={bids} />}
          <Link
            isExternal
            href={`https://etherscan.io/token/${
              isOg ? OG_GNAR_ADDRESS : V2_GNAR_ADDRESS
            }?a=${gnarData.gnar.gnarId}`}
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
  )
}
