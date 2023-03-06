import buildSvg from "utils/buildSvg"
import LoadingGnar from "./LoadingGnar"

import ogGnarData from "../data/image-data.json"
import gnarDataV2 from "../data/image-data-V2.json"
import {
  Box,
  Button,
  DarkMode,
  HStack,
  IconButton,
  Image as ChakraImage,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
  Tooltip,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react"
import nogglesIcon from "../assets/images/nouns-noggles-sharp.svg"
import bodyIcon from "../assets/images/nouns-nouns-part-body-sharp.svg"
import headIcon from "../assets/images/nouns-nouns-part-head-sharp.svg"
import accessoryIcon from "../assets/images/nouns-nouns-part-accessory-sharp.svg"
import Image from "next/image"
import { FaInfo } from "react-icons/fa"
import { MdFileDownload } from "react-icons/md"
import { FC, useRef } from "react"
import { GnarPart, Gnartwork } from "../utils"
import { GnarInfo } from "../hooks/useGnarInfo"

interface GnarProps {
  isOg: boolean
  gnarId: string
  gnartwork: Gnartwork
}

const Gnar: FC<GnarProps> = ({ gnartwork, isOg, gnarId }) => {
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  const { body, accessory, head, noggles } = gnartwork.parts

  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  const image = buildSvg(
    [body, accessory, head, noggles],
    palette,
    gnartwork?.background
  )

  return (
    <Box overflow={"visible!important"}>
      <ChakraImage
        ref={gnarImageRef}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
        w={"full"}
        src={image}
        alt={"gnar"}
      />

      <DarkMode>
        <HStack
          color={"chakra-body-text"}
          position={"absolute"}
          bottom={-12}
          left={"auto"}
          right={"auto"}
        >
          {!isOg && (
            <Popover
              isOpen={isOpen}
              onClose={onClose}
              placement={"bottom"}
              closeOnBlur
              autoFocus={false}
              returnFocusOnClose={false}
            >
              <PopoverTrigger>
                <IconButton
                  isActive={isOpen}
                  variant={"outline"}
                  borderRadius={"full"}
                  onClick={onToggle}
                  aria-label={"Traits info"}
                  icon={<FaInfo />}
                />
              </PopoverTrigger>

              <PopoverContent
                p={2}
                textStyle={"h2"}
                fontSize={{ base: "2xl", lg: "3xl" }}
                w={"fit-content"}
                maxW={"xl"}
              >
                <PopoverArrow />
                <PopoverBody p={1}>
                  <SimpleGrid
                    templateColumns={"30px 1fr"}
                    columns={2}
                    spacing={1}
                    alignItems={"center"}
                  >
                    <ChakraImage src={headIcon.src} />
                    <Text>{head.trait}</Text>
                    <ChakraImage src={nogglesIcon.src} />
                    <Text>{noggles.trait}</Text>
                    <ChakraImage src={accessoryIcon.src} />
                    <Text>{accessory.trait}</Text>
                    <ChakraImage src={bodyIcon.src} />
                    <Text>{body.trait}</Text>
                  </SimpleGrid>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          <Button
            variant={"outline"}
            borderRadius={"full"}
            leftIcon={<MdFileDownload />}
            onClick={() => {
              const canvas = document.createElement("canvas")
              canvas.width = 512
              canvas.height = 512
              canvas
                .getContext("2d")
                ?.drawImage(gnarImageRef.current, 0, 0, 512, 512)
              const link = document.createElement("a")
              link.href = canvas.toDataURL()
              link.download = `gnar-${gnarId}.png`
              link.click()
              canvas.remove()
              link.remove()
            }}
          >
            PNG
          </Button>
        </HStack>
      </DarkMode>
    </Box>
  )
}
export default Gnar
