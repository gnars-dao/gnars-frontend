import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  DarkMode,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  SimpleGrid,
  SimpleGridProps,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { FaInfo } from "react-icons/fa"
import { MdFileDownload } from "react-icons/md"
import { FC, useRef } from "react"
import { getGnartwork } from "../utils"
import { GnarData } from "../hooks/useGnarData"
import { FaSquareFull } from "react-icons/all"
import { AccessoryIcon, BodyIcon, HeadIcon, NogglesIcon } from "./Icons"
import { GnarImage } from "./GnarImage"
import { GnarToolbar } from "./GnarToolbar"

interface GnarProps extends BoxProps {
  isOg: boolean
  gnarData?: GnarData
}

const Gnar: FC<GnarProps> = ({ isOg, gnarData, ...props }) => {
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const gnartwork = gnarData
    ? getGnartwork(isOg, gnarData.gnar.seed)
    : undefined

  return (
    <Box overflow={"visible!important"} position={"relative"} {...props}>
      <GnarImage isOg={isOg} gnartwork={gnartwork} ref={gnarImageRef} />

      {gnarData && gnartwork && (
        <GnarToolbar
          isOg={isOg}
          downloadFilename={`gnar-${gnarData.gnar.gnarId}`}
          gnarImageRef={gnarImageRef}
          gnartwork={gnartwork}
          position={"absolute"}
          bottom={-12}
          left={"auto"}
          right={"auto"}
        />
      )}
    </Box>
  )
}
export default Gnar
