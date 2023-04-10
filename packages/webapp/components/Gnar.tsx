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

interface GnarProps extends BoxProps {
  isOg: boolean
  gnarData?: GnarData
  buttonProps?: ButtonProps
  gridProps?: SimpleGridProps
  withButtons?: boolean
  buttonsStackProps?: StackProps
  popoverProps?: PopoverProps
}

const Gnar: FC<GnarProps> = ({
  isOg,
  gnarData,
  buttonProps = {},
  gridProps = {},
  buttonsStackProps = {},
  withButtons = true,
  popoverProps = {},
  ...props
}) => {
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure()
  const gnartwork = gnarData
    ? getGnartwork(isOg, gnarData.gnar.seed)
    : undefined

  return (
    <Box overflow={"visible!important"} position={"relative"} {...props}>
      <GnarImage
        isOg={isOg}
        gnartwork={gnartwork}
        ref={gnarImageRef}
        onMouseOver={onOpen}
        onMouseLeave={onClose}
      />

      {/*@TODO extract to another component*/}
      {gnarData && gnartwork && withButtons && (
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
                  ?.drawImage(gnarImageRef.current!, 0, 0, 512, 512)
                const link = document.createElement("a")
                link.href = canvas.toDataURL()
                link.download = `gnar-${gnarData.gnar.gnarId}.png`
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
      )}
    </Box>
  )
}
export default Gnar
