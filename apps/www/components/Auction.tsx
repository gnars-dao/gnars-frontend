import clsx from "clsx"

import { getGnarData, isBgDark } from "utils"

import { AuctionDetails } from "./AuctionDetails"
import Gnar from "./Gnar"
import Menu from "./Menu"
import useGnarInfo from "../hooks/useGnarInfo"
import { Box, ColorModeProvider, DarkMode, Text } from "@chakra-ui/react"

interface AuctionProps {
  gnarId?: number
}

export default function Auction(props: AuctionProps) {
  const { gnarId } = props

  const { isLoading, data } = useGnarInfo(gnarId)

  const seed = data?.gnar?.seed
  const isOg = data?.gnar?.isOg
  const parts = getGnarData(gnarId, seed)

  console.log({ data, parts })

  const hasDarkBg = isBgDark(parts?.background)

  return (
    <ColorModeProvider value={hasDarkBg ? "dark" : "light"}>
      <Box
        color={"chakra-body-text"}
        bgColor={parts?.background ? `#${parts.background}` : "#d5d7e1"}
        className={"flex flex-col w-full items-center"}
        style={{}}
      >
        <Menu hasDarkBg={hasDarkBg} />
        <div className="flex flex-col lg:flex-row w-full ">
          <div className="flex flex-1 justify-center items-end">
            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full max-w-570px">
                <Gnar isOg={isOg} seed={parts} />
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:bg-inherit justify-center lg:justify-start">
            <AuctionDetails desiredGnarId={gnarId} />
          </div>
        </div>
      </Box>
    </ColorModeProvider>
  )
}
