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
import { useRef } from "react"

interface GnarProps {
  isOg: boolean
  gnarId: string
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
  const { seed, isOg, gnarId } = props
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const [isHovered, { on, off }] = useBoolean(false)
  const { isOpen: isExplicitlyOpen, onToggle, onClose } = useDisclosure()

  const isOpen = isHovered || isExplicitlyOpen

  if (!seed) return <LoadingGnar />

  const [body, accessory, head, noggles] = seed?.parts

  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  const image = buildSvg(seed?.parts, palette, seed?.background)

  return (
    <Box>
      <ChakraImage
        ref={gnarImageRef}
        onMouseOver={on}
        onMouseLeave={off}
        w={"full"}
        src={image}
        alt={"gnar"}
      />

      <HStack position={"absolute"} bottom={2} left={"75%"}>
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
                onMouseOver={on}
                onMouseLeave={off}
                isActive={isOpen}
                cursor={isHovered ? "default" : "pointer"}
                // isDisabled={isOpen}
                variant={"outline"}
                borderRadius={"full"}
                onClick={isHovered ? undefined : onToggle}
                aria-label={"Traits info"}
                icon={<FaInfo />}
              />
            </PopoverTrigger>

            <Portal>
              <DarkMode>
                <PopoverContent
                  p={2}
                  textStyle={"h2"}
                  color={"chakra-body-text"}
                  // minW={"xs"}
                  w={"fit-content"}
                  maxW={"xl"}
                  onMouseOver={on}
                  onMouseLeave={off}
                >
                  <PopoverArrow />
                  {!isExplicitlyOpen && <PopoverCloseButton />}
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
    </Box>
  )
}
