import buildSvg from "utils/buildSvg"
import LoadingGnar from "./LoadingGnar"

import ogGnarData from "../data/image-data.json"
import gnarDataV2 from "../data/image-data-V2.json"
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
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
  PopoverProps,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  SimpleGridProps,
  StackProps,
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
import { FC, useMemo, useRef } from "react"
import { GnarPart, Gnartwork } from "../utils"
import { GnarInfo } from "../hooks/useGnarInfo"
import { FaSquareFull } from "react-icons/all"
import { AccessoryIcon, BodyIcon, HeadIcon, NogglesIcon } from "./Icons"

interface GnarProps extends BoxProps {
  isOg: boolean
  gnarId: string
  gnartwork: Gnartwork
  buttonProps?: ButtonProps
  gridProps?: SimpleGridProps
  buttonsStackProps?: StackProps
  popoverProps?: PopoverProps
}

const Gnar: FC<GnarProps> = ({
  gnartwork,
  isOg,
  gnarId,
  buttonProps = {},
  gridProps = {},
  buttonsStackProps = {},
  popoverProps = {},
  ...props
}) => {
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()

  const palette = isOg ? ogGnarData.palette : gnarDataV2.palette
  const { body, accessory, head, noggles } = gnartwork.parts
  const image = useMemo(() => {
    return buildSvg(
      [body, accessory, head, noggles],
      palette,
      gnartwork.background
    )
  }, [gnarId])

  return (
    <Box overflow={"visible!important"} position={"relative"} {...props}>
      <ChakraImage
        ref={gnarImageRef}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
        w={"full"}
        src={image}
        alt={"gnar"}
        borderRadius={"md"}
      />

      <DarkMode>
        <HStack
          color={"chakra-body-text"}
          position={"absolute"}
          bottom={-12}
          left={"auto"}
          right={"auto"}
          {...buttonsStackProps}
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
                  {...buttonProps}
                />
              </PopoverTrigger>

              <PopoverContent w={"fit-content"} maxW={"xl"}>
                <PopoverArrow />
                <PopoverBody p={1}>
                  <SimpleGrid
                    p={2}
                    textStyle={"h2"}
                    fontSize={{ base: "2xl", lg: "3xl" }}
                    templateColumns={"30px 1fr"}
                    columns={2}
                    spacing={1}
                    alignItems={"center"}
                    {...gridProps}
                  >
                    <NogglesIcon />
                    <Text>{gnartwork.parts.noggles.trait}</Text>
                    <HeadIcon />
                    <Text>{gnartwork.parts.head.trait}</Text>
                    <AccessoryIcon />
                    <Text>{gnartwork.parts.accessory.trait}</Text>
                    <BodyIcon />
                    <Text>{gnartwork.parts.body.trait}</Text>
                    {gnartwork.parts.background && (
                      <>
                        <FaSquareFull
                          style={{
                            display: "inline-block",
                            padding: "4px",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                        <Text>{gnartwork.parts.background.trait}</Text>
                      </>
                    )}
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
            {...buttonProps}
          >
            PNG
          </Button>
        </HStack>
      </DarkMode>
    </Box>
  )
}
export default Gnar
