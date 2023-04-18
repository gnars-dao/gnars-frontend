// @TODO implement playground
import {
  Box,
  DarkMode,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import Menu from "../components/Menu"
import { usePlaygroundState } from "../hooks/usePlaygroundState"
import { Generator } from "../components/Playground/Generator"
import { GnarImage } from "../components/GnarImage"
import { GnarToolbar } from "components/GnarToolbar"
import PlaygroundGnar from "components/Playground/PlaygroundGnar"

export default function Playground() {
  const gnarSize = useBreakpointValue({ base: "96px", lg: "128px" }) ?? "96px"
  const { generatedGnars } = usePlaygroundState()
  return (
    <DarkMode>
      <VStack
        w={"full"}
        h={"fit-content"}
        color={"chakra-body-text"}
        spacing={6}
      >
        <Menu />
        <Heading>Playground</Heading>
        <VStack
          w={"full"}
          spacing={20}
          alignItems={"center"}
          py={{ base: 4, lg: 20 }}
          px={{ base: 4, lg: 20 }}
        >
          <Generator buttonSize={gnarSize} />
          <Box minW={{ base: "full", lg: "4xl" }} maxW={"full"}>
            <SimpleGrid
              justifyContent={"center"}
              p={[2, 6]}
              borderRadius={"md"}
              gridTemplateColumns={`repeat(auto-fit, ${gnarSize})`}
              spacing={4}
              overflow={"visible"}
            >
              {generatedGnars.map((gnar) => {
                return (
                  <PlaygroundGnar
                    gnartwork={gnar.gnartwork}
                    playgroundGnarId={gnar.id}
                  />
                )
              })}
            </SimpleGrid>
          </Box>
        </VStack>
      </VStack>
    </DarkMode>
  )
}
