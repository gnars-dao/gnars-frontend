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
import Gnar from "../components/Gnar"
import { usePlaygroundState } from "../hooks/usePlaygroundState"
import { Generator } from "../components/Playground/Generator"
import { Claiming } from "../components/Claiming"

export default function Claim() {
  return (
    <DarkMode>
      <VStack w={"full"} h={"full"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Heading>Claim Gnars</Heading>
        <Claiming />
      </VStack>
    </DarkMode>
  )
}
