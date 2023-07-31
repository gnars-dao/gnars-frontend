import {
  AspectRatio,
  Box,
  chakra,
  Code,
  Divider,
  Heading,
  HStack,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { Londrina_Solid } from "next/font/google"
import { FC } from "react"
import TextLink from "./TextLink"
const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
})

export default function Explainer() {
  return (
    <Box color={"chakra-body-text"} bgColor={"chakra-body-bg"}>
      <VStack px={[2, 6]} py={{ base: 10, sm: 32 }} spacing={{ base: 10, sm: 32 }} w={"full"} justifyContent={"center"}>
        <Stack
          px={0}
          w={"full"}
          direction={{ base: "column", xl: "row" }}
          spacing={{ base: 10, sm: 32 }}
          justifyContent={"center"}
          alignItems={"start"}
        >
          <Text
            textStyle={"h1"}
            fontSize={{
              base: "calc(60px + (128 - 60) * ((100vw - 375px) / (1280 - 375)))",
              xl: "8xl",
            }}
          >
            ONE GNAR,
            <br />
            LESS OFTEN,
            <br />
            FOREVER.
          </Text>
          <AspectRatio ratio={16 / 9} w={{ base: "full", md: "xl", xl: "2xl" }}>
            <chakra.iframe
              width="full"
              height="full"
              src="https://www.youtube.com/embed/JQSmfSnRGVk?rel=0&modestbranding=1&controls=1"
              title="Gnars: The New Way Skateboarding Pros Earn $$"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </AspectRatio>
        </Stack>

        <VStack
          alignItems={"center"}
          px={4}
          maxW={"container.lg"}
          spacing={10}
          divider={<Divider orientation="horizontal" borderWidth={1} borderColor={"chakra-body-text"} />}
        >
          <Section>
            <Heading as="h1" fontSize={"6xl"}>
              WTF?
            </Heading>
            <p>
              <TextLink href="https://gnars.com"> Gnars</TextLink>{" "}
              {`is a
                community owned (and run) extreme sports club. We prefer a world
                where kids aren't shilled energy drinks by their heroes. So as a
                community of action sports enthusiasts, we've formed a DAO to
                rethink how shredders get sponsored.`}
            </p>

            <p>
              {`Based on Nouns open source code and CC0 artwork, they're stored
                fully onchain on Ethereum with no external dependencies (not
                even IPFS), and each one represents a DAO vote. We're changing
                the way extreme sport is funded with `}
              <TextLink href="https://nouns.wtf/vote/51">backing from Nouns DAO</TextLink>.
            </p>

            <p>
              Start creating Gnars off-chain using the <TextLink href={"/playground"}>Playground</TextLink> or learn
              more at <TextLink href="https://gnars.com">gnars.com</TextLink>.
            </p>
          </Section>

          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Summary
            </Heading>
            <UnorderedList listStylePos={"inside"}>
              <ListItem>Gnars artwork is in the public domain.</ListItem>
              <ListItem>One Gnar is trustlessly auctioned every 10 minutes, then less often, forever.</ListItem>
              <ListItem>By “less often” we mean auction length doubles every 1000 auctions.</ListItem>
              <ListItem>Gnar auction proceeds are trustlessly sent to the treasury and founder.</ListItem>
              <ListItem>Setting the bid slider determines the resulting percentage split.</ListItem>
              <ListItem>Settlement of one auction kicks off the next.</ListItem>
              <ListItem>All Gnars are members of Gnars DAO.</ListItem>
              <ListItem>One Gnar is equal to one vote.</ListItem>
              <ListItem>The treasury is controlled exclusively by Gnars via governance.</ListItem>
              <ListItem>Artwork is generative and stored directly onchain (not IPFS).</ListItem>
              <ListItem>Shredders receive 10% of supply.</ListItem>
            </UnorderedList>
          </Section>

          <Section id="gnarving">
            <Heading as="h2" fontSize={"4xl"}>
              Gnarving Auctions
            </Heading>
            <Stack direction={{ base: "column", xl: "row-reverse" }} alignItems={"center"}>
              <VStack flexShrink={0} w={{ base: "full", sm: "sm" }}>
                <Heading>Auctions</Heading>
                <Image
                  src="/images/auction-chart.png"
                  alt={
                    "a chart depicting the increasing gnars auction duration as a function of the amount of auctions"
                  }
                />
                <SimpleGrid
                  columns={2}
                  w={"full"}
                  px={8}
                  fontFamily={londrinaSolid.style.fontFamily}
                  fontSize={["2xl", "3xl"]}
                >
                  <HStack>
                    <Box boxSize={4} bgColor={"#E53B44"} />
                    <Text> Per day</Text>
                  </HStack>
                  <HStack>
                    <Box boxSize={4} bgColor={"#0484D1"} />
                    <Text> Duration</Text>
                  </HStack>
                </SimpleGrid>
              </VStack>
              <VStack spacing={8}>
                <p>
                  The Gnars Auction Contract will act as a self-sufficient Gnar generation and distribution mechanism,
                  auctioning one Gnar every 10 minutes, then less often, forever. As per the supply curve diagram shown
                  above, auction duration doubles every 1000 auctions, known as “The Gnarving” and in effect halving the
                  supply emission each time.
                </p>
                <p>
                  Auction proceeds (ETH) are automatically sent to the Gnars DAO treasury and to our founder
                  0xigami.eth, depending on what balance you set with the bid slider. You can even choose not to reward
                  the founder if you wish. Funds received to the treasury are governed by Gnar owners.
                </p>
                <p>
                  Each time an auction is settled, the settlement transaction will also cause a new Gnar to be minted
                  and a new auction to begin. While settlement is most heavily incentivized for the winningbidder, it
                  can be triggered by anyone, allowing the system to trustlessly auction Gnars as long as Ethereum is
                  operational and there are interested bidders.
                </p>
              </VStack>
            </Stack>
          </Section>

          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Bidding and Settling Auctions
            </Heading>

            <Heading as={"h3"} fontSize={"2xl"}>
              Settlement
            </Heading>
            <p>
              Anyone can settle an auction. When an auction ends, a gas-only transaction is required to start the next
              auction and mint the current Gnar to the winner’s wallet. As gas prices fluctuate, the cost of settlement
              also fluctuates.
            </p>

            <p>
              Cost of settlement for every Gnar ID ending in 6 is higher as it consumes more gas. This is due to the
              transaction also triggering the free Gnar mint: all Gnars ending in 7 are sent to the treasury and held on
              behalf of the Shredders.
            </p>
            <Heading as={"h3"} fontSize={"2xl"}>
              Bids
            </Heading>
            <p>
              Once an auction starts, everyone has 10 minutes to bid (auction duration doubles every 1000 auctions from
              #627 onwards). Anyone can bid an amount at/above 0.011 ETH. If your bid is outbid by someone else, the
              full amount of your bid (minus gas spent to bid) is returned to you in the same transaction as the new
              higher bid.
            </p>
            <Heading as={"h3"} fontSize={"2xl"}>
              Bid Refunds
            </Heading>
            <p>
              Unsuccessful bids are refunded in full. Refunds are sent via an internal transaction included in the
              transaction of a new higher bid. This means that refunds for unsuccessful bids occur when a higher bid is
              received.
            </p>
          </Section>

          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Gnars DAO
            </Heading>
            <p>
              Gnars DAO utilizes a Gnosis Safe multisig, which combined with Zodiac Reality Module and Snapshot, allows
              for gasless governance voting. Gnars DAO is the main governing body of the Gnars ecosystem and the Gnars
              DAO treasury receives whatever percentage of ETH proceeds bidders choose at time of bidding.
            </p>
            <p>
              Each Gnar is an irrevocable member of Gnars DAO and entitled to one vote in all governance matters. Gnar
              votes are non-transferable (if you sell your Gnar the vote goes with it) but delegatable, which means you
              can assign your vote to someone else as long as you own your Gnar.
            </p>
          </Section>

          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Gnar Traits
            </Heading>
            <p>
              {`Gnars are generated randomly based on Ethereum block hashes.
                  There are no 'if' statements or other rules governing Gnar
                  trait scarcity, which makes all Gnars equally rare. As of this
                  writing, Gnars are made up of:`}
            </p>
            <UnorderedList listStylePos={"inside"}>
              <ListItem>backgrounds (12)</ListItem>
              <ListItem>bodies (30)</ListItem>
              <ListItem>accessories (153)</ListItem>
              <ListItem>heads (235)</ListItem>
              <ListItem>glasses (68)</ListItem>
            </UnorderedList>
            <p>
              You can experiment with off-chain Gnar generation at the {""}
              <TextLink href={"/playground"}>Playground</TextLink>, or browse through different traits by using filters
              on your favorite NFT marketplace.
            </p>
          </Section>
          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Onchain Artwork
            </Heading>
            <p>
              Gnars are stored directly on Ethereum and do not utilize pointers to other networks such as IPFS. This is
              possible because Gnar parts are compressed and stored onchain using a custom run-length encoding (RLE),
              which is a form of lossless compression.
            </p>
            <p>
              The compressed parts are efficiently converted into a single base64 encoded SVG image onchain. To
              accomplish this, each part is decoded into an intermediate format before being converted into a series of
              SVG rects using batched, onchain string concatenation. Once the entire SVG has been generated, it is
              base64 encoded.
            </p>
          </Section>
          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              Gnar Seeder Contract
            </Heading>

            <p>
              The Gnar Seeder contract is used to determine Gnar traits during the minting process. The seeder contract
              can be replaced to allow for future trait generation algorithm upgrades. Additionally, it can be locked by
              the Gnars DAO to prevent any future updates. Currently, Gnar traits are determined using pseudo-random
              number generation:
            </p>
            <Code colorScheme={"red"} p={4}>
              keccak256(
              <wbr />
              abi.encodePacked(
              <wbr />
              blockhash(block.number - 1), gnarId))
            </Code>
            <p>
              Trait generation is not truly random. Traits can be predicted when minting a Gnar on the pending block.
            </p>
          </Section>
          <Section>
            <Heading as="h2" fontSize={"4xl"}>
              0xigami’s Reward
            </Heading>

            <p>0xigami is the builder that initiated Gnars.</p>
            <p>
              You have the choice to reward 0xigami with a percentage of a successful bid, a tip, by setting the slider
              to a suitable position. By default the slider is set to the midpoint, as a 50/50 split meaning that half
              of your bid, if successful, would be deposited to 0xigami.eth during settlement.
            </p>
            <p>
              From time to time we change the tip recipient in order to facilitate promotions with other CC0 projects
              included in our protocol. For example, Nounvember, where all tips during the month of November are sent to
              the Nouns DAO treasury.
            </p>
          </Section>
        </VStack>
      </VStack>
    </Box>
  )
}

export const Section: FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack alignItems={"start"} w="full" spacing={6} {...props}>
      {children}
    </VStack>
  )
}
