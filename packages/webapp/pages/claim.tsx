import { DarkMode, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import { HDClaiming } from "components/HDClaiming"
import Menu from "../components/Menu"
import { OGClaiming } from "../components/OGClaiming"

export default function Claim() {
  return (
    <DarkMode>
      <VStack w={"full"} flexGrow={1} h={"fit-content"} color={"chakra-body-text"} spacing={8}>
        <Menu />
        <Heading>Claim</Heading>

        <Tabs isLazy defaultIndex={1} maxW={"container.lg"} isFitted colorScheme="orange">
          <TabList>
            <Tab>OG Gnars</Tab>
            <Tab>Gnars HD</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack w={"full"} p={[4, 20]} alignItems={"start"} spacing={10}>
                <Text as={"h2"} textStyle={"h2"}>
                  Claim your OG Gnars
                </Text>
                <Text>
                  {`Gnars is now a DAO but it didn't start as one. Up until Gnar 626 we
            had a different NFT contract. But it wasn't cut out for what we
            wanted to do in future.`}
                </Text>
                <Text>
                  {`The original Gnars are known as OGs and differ in appearance to the
            current Gnars NFTs. Since we've upgraded to fully onchain
            governance, we're amalgamating voting into one token.`}
                </Text>
                <Text>
                  {`For every OG you own, you can claim 2 brand new Gnars (for free) to
            maintain your OG voting power. This can be done once per OG and you
            get to keep it (no burning) as the digital collectible it was always
            intended to be!`}
                </Text>
                <OGClaiming />
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack w={"full"} p={[4, 20]} alignItems={"start"} spacing={10}>
                <Text as={"h2"} textStyle={"h2"}>
                  Claim your HD Gnars
                </Text>
                <Text>{`HD Gnars are the High Definition counterparts to your Gnars. These are not transferrable, and their ownership is bound to the respective Gnar.`}</Text>
                <HDClaiming />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </DarkMode>
  )
}
