import clsx from "clsx"

import { getGnarData, isBgDark } from "utils"

import { AuctionDetails } from "./AuctionDetails"
import Gnar from "./Gnar"
import Menu from "./Menu"
import useGnarInfo from "../hooks/useGnarInfo"
import {
  AspectRatio,
  Box,
  ColorMode,
  ColorModeProvider,
  DarkMode,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"

interface AuctionProps {
  desiredGnarId?: number
}

export default function Auction(props: AuctionProps) {
  const { desiredGnarId } = props

  const { isLoading, data } = useGnarInfo(desiredGnarId)

  const gnarId = data?.gnar?.gnarId
    ? parseInt(data?.gnar?.gnarId)
    : desiredGnarId
  const seed = data?.gnar?.seed
  const isOg = data?.gnar?.isOg
  const parts = getGnarData(gnarId, seed)

  const hasDarkBg = isBgDark(parts?.background)
  const auctionDetailsColorMode = useBreakpointValue<ColorMode>({
    base: "dark",
    lg: hasDarkBg ? "dark" : "light",
  })
  const gnarBgColor = parts?.background ? `#${parts.background}` : "#d5d7e1"

  return (
    <ColorModeProvider value={hasDarkBg ? "dark" : "light"}>
      <Box
        color={"chakra-body-text"}
        className={"flex flex-col w-full items-center"}
      >
        <Menu bgColor={gnarBgColor} />
        <Box className="flex flex-col lg:flex-row w-full ">
          <Box
            bgColor={gnarBgColor}
            className="flex flex-1 justify-center items-end"
          >
            <div className="flex w-full justify-center lg:justify-end">
              <AspectRatio ratio={1 / 1} w={"full"} maxW={"570px"}>
                <Gnar isOg={isOg} seed={parts} />
              </AspectRatio>
            </div>
          </Box>
          <ColorModeProvider value={auctionDetailsColorMode}>
            <VStack
              color={"chakra-body-text"}
              flex={1}
              bgColor={{ base: undefined, lg: gnarBgColor }}
              justifyContent={"start"}
            >
              <AuctionDetails desiredGnarId={gnarId} />
            </VStack>
          </ColorModeProvider>
        </Box>
      </Box>
    </ColorModeProvider>
  )
}
