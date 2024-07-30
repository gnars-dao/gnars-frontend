import {
  Button,
  HStack,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Spinner,
  StackProps,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { Londrina_Solid } from "next/font/google"
import { FC, useEffect, useState } from "react"
import { FiExternalLink, FiInfo } from "react-icons/fi"
import { HiExternalLink } from "react-icons/hi"
import { RiAuctionLine } from "react-icons/ri"
import { OG_GNAR_ADDRESS, TREASURY_ADDRESS, V2_GNAR_ADDRESS } from "../../constants/gnarsDao"
import { GnarData } from "../../hooks/useGnarData"
import { useNnsNameWithEnsFallback } from "../../hooks/useNnsNameWithEnsFallback"
import { is10thGnar, shortAddress } from "../../utils"
import { EtherscanIcon, OGNogglesIcon, ShredIcon } from "../Icons"
import { AuctionStatus } from "./AuctionStatus"
import { BidForGnar } from "./BidForGnar"
import { BiddingAndSettlingInfo } from "./BiddingAndSettlingInfo"
import { BidsTable } from "./BidsTable"
import { GnarNavigation } from "./GnarNavigation"
import { GnarvingTracker } from "./GnarvingTracker"
import { SettleAuctionButton } from "./SettleAuctionButton"

const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
})

interface GnarInfoProps extends StackProps {
  isOg: boolean
  gnarData: GnarData
}

const baseLink = "https://nouns.build/dao/base/0x880Fb3Cf5c6Cc2d7DFC13a993E839a9411200C17"

export const GnarInfo: FC<GnarInfoProps> = ({ isOg, gnarData, ...props }: GnarInfoProps) => {
  const { endTimestamp, latestBidder, latestBid, settled, bids } = {
    ...(gnarData.gnar.auction ?? {}),
  }

  const { isOpen: showBids, onToggle: toggleBids } = useDisclosure()

  const { block } = gnarData

  const [blockTimestamp, setBlockTimestamp] = useState<number | null | undefined>(block?.timestamp)

  useEffect(() => {
    // sometimes the timestamp of new blocks is null (https://github.com/graphprotocol/support/issues/104).
    // In that case, we keep the last known timestamp. The next refetch should update it
    if (block?.timestamp) {
      setBlockTimestamp(block.timestamp)
    }
  }, [block?.timestamp])

  // @TODO add slide animation when changing Gnar
  // @TODO add fake loader like https://github.com/rstacruz/nprogress

  const ownerName = useNnsNameWithEnsFallback(gnarData.gnar.owner)

  const auctionEnded =
    endTimestamp && blockTimestamp ? Date.now() > endTimestamp * 1000 && blockTimestamp > endTimestamp : true

  const isTreasuryGnar = is10thGnar(parseInt(gnarData.gnar.gnarId))
  const winner = isTreasuryGnar ? TREASURY_ADDRESS : latestBidder
  const isBurned = !!gnarData.gnar.auction && auctionEnded && !winner
  const isClaimedGnar = !isTreasuryGnar && !gnarData.gnar.auction
  return (
    <VStack w={"full"} alignItems={"start"} spacing={6} maxW={{ base: "full", lg: "500px", xl: "xl" }} {...props}>
      <Heading>Under Construction</Heading>

      <Heading as="h3" size={"lg"}>
        Use{" "}
        <Link href="https://nouns.build/dao/base/0x880Fb3Cf5c6Cc2d7DFC13a993E839a9411200C17" color={"#fce464"}>
          Nouns Builder
        </Link>{" "}
        in the mean time
      </Heading>
      {/*
      <SimpleGrid
        w="full"
        rowGap={[4, 2]}
        columnGap={0}
        templateAreas={{
          base: `"gnarId" "navigation" "auction" "gnarvingTracker" `,
          sm: `"gnarId navigation" "gnarvingTracker gnarvingTracker" "auction auction"`,
        }}
        color={"chakra-body-text"}
        spacing={6}
        overflow={"visible"}
      >
        <GnarvingTracker
          justifySelf={"stretch"}
          gridArea={"gnarvingTracker"}
          gnarvingData={gnarData.gnarving}
          w={"full"}
        />
        <VStack
          justifySelf={["center", "start"]}
          gridArea={"gnarId"}
          lineHeight={"80%"}
          fontFamily={londrinaSolid.style.fontFamily}
          fontSize={{ base: "5xl", xl: "6xl" }}
        >
          {isOg && <Text position={"relative"}>OG</Text>}
          {gnarData ? <Text>Gnar {gnarData.gnar.gnarId}</Text> : <Spinner />}
        </VStack>


        <GnarNavigation gridArea={"navigation"} alignSelf={"end"} justifySelf={["center", "end"]} gnarData={gnarData} />
        <AuctionStatus
          gridArea={"auction"}
          justifySelf={"stretch"}
          endTimestamp={endTimestamp}
          auctionEnded={auctionEnded}
          isBurned={isBurned}
          isTreasuryGnar={isTreasuryGnar}
          isClaimedGnar={isClaimedGnar}
          latestBid={latestBid}
          winner={winner}
        />{" "}
      </SimpleGrid>
        */}
      <VStack alignItems={"start"} spacing={10} w={"full"}>
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
                  To pay homage and show our respect as a Nouns extension, every Gnar ending in 7 is reserved for
                  onboarding shredders.
                </>
              )}
              {isClaimedGnar && (
                <>
                  When Gnars DAO was launched, holders of OG Gnars were able to claim 2 Gnars per OG Gnar held, as a way
                  to give them voting power in the governance. This Gnar was claimed that way.
                </>
              )}
              {isOg && (
                <>
                  OG Gnars dropped before Gnars was officially a DAO, and have no voting power. Each OG Gnar entitled
                  its holder to claim 2 Gnars.
                </>
              )}
            </Text>
          </VStack>
        )}
        {/*(!gnarData.gnar.auction || (gnarData.gnar.auction && settled)) && !isBurned && (
          <HStack spacing={1} fontSize={"lg"} color={"chakra-body-text"} fontWeight={"semibold"}>
            {isOg || isClaimedGnar ? <OGNogglesIcon /> : <ShredIcon />}
            <Text>Owned by </Text>
            <Link isExternal href={`https://etherscan.io/address/${gnarData.gnar.owner}`}>
              {ownerName ?? shortAddress(gnarData.gnar.owner)}
              <HiExternalLink style={{ display: "inline", marginBottom: "2px" }} />
            </Link>
          </HStack>
        )}
        {gnarData.gnar.auction && !settled && (
          <VStack w={"full"} justifyContent={"center"} spacing={1}>
            {auctionEnded ? (
              <SettleAuctionButton size={"lg"} w={"full"} />
            ) : (
              <BidForGnar gnarId={gnarData.gnar.gnarId} latestBid={latestBid} w={"full"} />
            )}
            <BiddingAndSettlingInfo />
            {bids?.length && bids.length > 0 && (
              <VStack w="full" alignItems={"end"} spacing={1}>
                <Text fontSize={"sm"}>
                  {bids.length} Bid{bids.length > 1 && "s"}
                </Text>
                <BidsTable bids={bids} w={"full"} overflow={"scroll"} flexGrow={1} maxH={"180px"} />
              </VStack>
            )}
          </VStack>
        ) */}
      </VStack>
      {/*@TODO prevent flashing bid when cached auction was already settled*/}
      {gnarData && (!gnarData.gnar.auction || settled) && (
        <VStack align={"start"} w="full">
          <HStack>
            {bids && bids.length > 0 && (
              <Button isActive={showBids} leftIcon={<RiAuctionLine />} variant={"outline"} onClick={toggleBids}>
                {bids.length} Bid{bids.length > 1 && "s"}
              </Button>
            )}
            <Link
              isExternal
              href={`https://etherscan.io/token/${isOg ? OG_GNAR_ADDRESS : V2_GNAR_ADDRESS}?a=${gnarData.gnar.gnarId}`}
            >
              <IconButton aria-label={"Etherscan"} variant={"outline"} icon={<EtherscanIcon />} />
            </Link>
          </HStack>
          {bids && bids.length > 0 && (
            <AnimatePresence>
              {showBids && (
                <BidsTable
                  as={motion.div}
                  // @ts-expect-error
                  initial={{ maxHeight: 0 }}
                  animate={{ maxHeight: 180 }}
                  exit={{ maxHeight: 0 }}
                  bids={bids}
                  w={"full"}
                  overflow={"scroll"}
                  flexGrow={1}
                />
              )}
            </AnimatePresence>
          )}
        </VStack>
      )}
    </VStack>
  )
}
