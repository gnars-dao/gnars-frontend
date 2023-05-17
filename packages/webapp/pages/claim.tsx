import {
  Box,
  DarkMode,
  Heading,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import Menu from "../components/Menu"
import { usePlaygroundState } from "../hooks/usePlaygroundState"
import { Generator } from "../components/Playground/Generator"
import { Claiming } from "../components/Claiming"

export default function Claim() {
  return (
    <DarkMode>
      <VStack
        w={"full"}
        flexGrow={1}
        h={"fit-content"}
        color={"chakra-body-text"}
        spacing={20}
      >
        <Menu />
        <Heading>Claim Gnars</Heading>
        <VStack maxW={"6xl"} px={[4, 20]} alignItems={"start"}>
          <Text>
            Gnars is now a DAO but it didn't start as one. Up until Gnar 626 we
            had a different NFT contract. But it wasn't cut out for what we
            wanted to do in future.
          </Text>
          <Text>
            The original Gnars are known as OGs and differ in appearance to the
            current Gnars NFTs. Since we've upgraded to fully onchain
            governance, we're amalgamating voting into one token.
          </Text>
          <Text>
            For every OG you own, you can claim 2 brand new Gnars (for free) to
            maintain your OG voting power. This can be done once per OG and you
            get to keep it (no burning) as the digital collectible it was always
            intended to be!
          </Text>
        </VStack>
        <Claiming />
      </VStack>
    </DarkMode>
  )
}
