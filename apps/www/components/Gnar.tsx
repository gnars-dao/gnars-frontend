import buildSvg from "utils/buildSvg"
import LoadingGnar from "./LoadingGnar"

import ogGnarData from "../data/image-data.json"
import gnarDataV2 from "../data/image-data-V2.json"
import {
  Box,
  DarkMode,
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
import { BiInfoSquare } from "react-icons/bi"
import nogglesIcon from "../assets/images/nouns-noggles-sharp.svg"
import bodyIcon from "../assets/images/nouns-nouns-part-body-sharp.svg"
import headIcon from "../assets/images/nouns-nouns-part-head-sharp.svg"
import accessoryIcon from "../assets/images/nouns-nouns-part-accessory-sharp.svg"
import Image from "next/image"

interface GnarProps {
  isOg: boolean
  seed:
    | {
        parts: {
          filename: string
          trait?: string
          data: string
        }[]
        background: string
      }
    | undefined
}

export default function Gnar(props: GnarProps) {
  const { seed, isOg } = props
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  if (!seed) return <LoadingGnar />

  const [body, accessory, head, noggles] = seed?.parts

  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  const image = buildSvg(seed?.parts, palette, seed?.background)

  return (
    <Box>
      <ChakraImage
        onMouseOver={onOpen}
        onMouseLeave={onClose}
        w={"full"}
        src={image}
        alt={"gnar"}
      />

      {!isOg && (
        <Popover
          closeDelay={500}
          offset={[0, 12]}
          isOpen={isOpen}
          onClose={onClose}
          placement={"bottom"}
          arrowSize={16}
          autoFocus={false}
          returnFocusOnClose={false}
        >
          <PopoverTrigger>
            {/*@TODO solve flickering tooltip issue when moving the mouse in/out of the button*/}
            <IconButton
              isActive={isOpen}
              position={"absolute"}
              bottom={2}
              right={"15%"}
              variant={"outline"}
              borderRadius={"full"}
              onClick={onToggle}
              aria-label={"Traits info"}
              icon={<BiInfoSquare />}
            />
          </PopoverTrigger>
          <Portal>
            <DarkMode>
              <PopoverContent
                p={2}
                textStyle={"h2"}
                // minW={"xs"}
                w={"fit-content"}
                maxW={"xl"}
                onMouseOver={onOpen}
                onMouseLeave={onClose}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Traits</PopoverHeader>
                <PopoverBody>
                  <SimpleGrid
                    templateColumns={"30px 1fr"}
                    columns={2}
                    spacing={2}
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
            </DarkMode>
          </Portal>
        </Popover>
      )}
    </Box>
  )
}
