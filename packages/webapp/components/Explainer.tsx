import { FC } from "react";
import TextLink from "./TextLink";
import {
  AspectRatio,
  Box,
  Code,
  Divider,
  HStack,
  Heading,
  Image,
  ListItem,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  UnorderedList,
  VStack,
  chakra
} from "@chakra-ui/react";
import { Londrina_Solid } from "next/font/google";

const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ["latin"]
});

export default function Explainer() {
  return (
    <Box color={"chakra-body-text"} bgColor={"chakra-body-bg"}>
      <VStack px={[2, 6]} py={{ base: 10, sm: 5, md: 32 }} spacing={{ base: 10, sm: 32 }} w={"full"} justifyContent={"center"}>
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
              xl: "8xl"
            }}
            textAlign={{ base: "center", md: 'left' }}
            alignSelf={{ base: 'center', md: 'inherit' }}
            marginTop={{ xsm: -15, base: 10, sm: 32 }}
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
              <TextLink href="https://gnars.com"> Gnars</TextLink> is a headless brand that empowers action sportspeople
              with a shared treasury and tools for collective creation. We prefer a world where kids aren&#x2019;t
              shilled energy drinks by their heroes. So we&#x2019;ve formed a DAO to rethink how shredders get paid.
            </p>

            <p>
              Based on Nouns open source code and CC0 artwork, each Gnar is an NFT stored fully onchain on Ethereum with
              no external dependencies (not even IPFS), and each one represents a DAO vote. We received{" "}
              <TextLink href="https://nouns.wtf/vote/51">69 ETH from Nouns DAO</TextLink> to get started.
            </p>

            <p>
              Create some Gnars offchain using the <TextLink href={"/playground"}>Playground</TextLink> or win an
              auction to join!
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
                  Auction proceeds (ETH) are automatically sent to the Gnars DAO treasury and to our founder gami.eth,
                  depending on what balance you set with the bid slider. You can even choose not to reward the founder
                  if you wish. Funds received to the treasury are governed by Gnar owners.
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
              #627 onwards). Anyone can bid an amount at/above 0.01 ETH. If your bid is outbid by someone else, the full
              amount of your bid (minus gas spent to bid) is returned to you in the same transaction as the new higher
              bid.
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
              Gnars DAO utilizes a DAO executor for fully onchain governance just like Nouns DAO. We also have a Safe
              multisig, which allows for gasless voting on NFT requests by shredders. Gnars DAO is the main governing
              body of the Gnars ecosystem and the treasury receives whatever percentage of ETH proceeds bidders choose
              at time of bidding.
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
              Gami&#x2019;s Reward
            </Heading>

            <p>Gami is the builder that initiated Gnars.</p>
            <p>
              You have the choice to reward Gami with a percentage of a successful bid, a tip, by setting the slider to
              a suitable position. By default the slider is set to the 90/10, meaning that 10% of your bid, if
              successful, would be deposited to gami.eth during settlement.
            </p>
            <p>
              From time to time we change the tip recipient in order to facilitate promotions with other CC0 projects
              included in our protocol.
            </p>
          </Section>
        </VStack>
      </VStack>
    </Box>
  );
}

export const Section: FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack alignItems={"start"} w="full" spacing={6} {...props}>
      {children}
    </VStack>
  );
};
