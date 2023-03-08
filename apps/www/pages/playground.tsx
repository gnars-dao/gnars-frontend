// @TODO implement playground
import * as CSS from "csstype"
import {
  Box,
  Button,
  Center,
  CenterProps,
  DarkMode,
  Heading,
  HStack,
  PropsOf,
  SimpleGrid,
  Square,
  Icon,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  VStack,
  Wrap,
  WrapItem,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react"
import Menu from "../components/Menu"
import Footer from "../components/Footer"
import { memoize, sample, some, times } from "lodash"
import { motion } from "framer-motion"
import {
  AccessoryIcon,
  BodyIcon,
  HeadIcon,
  NogglesIcon,
} from "../components/Icons"
import { BsSquareFill, FaRandom, FaSquareFull } from "react-icons/all"
import { FC, useMemo, useState } from "react"
import { IconType } from "react-icons"
import { jsx } from "@emotion/react"
import JSX = jsx.JSX
import {
  generateGnarV2Seed,
  getGnartwork,
  GnarPart,
  Gnartwork,
  PartKind,
  partKinds,
} from "../utils"
import Gnar from "../components/Gnar"
import gnarDataV2 from "../data/image-data-V2.json"
import buildSvg from "../utils/buildSvg"
import { GnarSeed } from "../types"
import { create } from "zustand"

type PlaygroundGnar = {
  gnartWork: Gnartwork
  id: number
}

interface PlaygroundState {
  counter: number
  generatedGnars: PlaygroundGnar[]
  parts: { [K in PartKind]?: GnarPart[] }
  selectedParts: { [K in PartKind]?: GnarPart[] }
  select: (partKind: PartKind, part: GnarPart) => void
  clearSelection: (partKind: PartKind) => void
  generate: () => void
  clear: () => void
}

const usePlaygroundState = create<PlaygroundState>((set) => ({
  counter: 0,
  generatedGnars: [],
  parts: gnarDataV2.images as { [K in PartKind]: GnarPart[] },
  selectedParts: {},
  select: (partKind, part) =>
    set(({ selectedParts }) => ({
      selectedParts: {
        ...selectedParts,
        [partKind]: [...(selectedParts[partKind] ?? []), part],
      },
    })),
  clearSelection: (partKind) =>
    set(({ selectedParts: { [partKind]: clearedPart, ...restOfParts } }) => ({
      selectedParts: restOfParts,
    })),
  generate: () => {
    set(({ selectedParts, parts, counter, generatedGnars }) => {
      const newGnar = {
        id: counter + 1,
        gnartWork: {
          parts: {
            body: sample(
              selectedParts?.["bodies"]
                ? selectedParts["bodies"]
                : parts["bodies"]
            ),
            accessory: sample(
              selectedParts?.["accessories"]
                ? selectedParts["accessories"]
                : parts["accessories"]
            ),
            head: sample(
              selectedParts?.["heads"] ? selectedParts["heads"] : parts["heads"]
            ),
            noggles: sample(
              selectedParts?.["glasses"]
                ? selectedParts["glasses"]
                : parts["glasses"]
            ),
          },
          palette: gnarDataV2.palette,
          background: sample(
            selectedParts?.["backgrounds"]
              ? selectedParts["backgrounds"]
              : parts["backgrounds"]
          ),
        },
      } as PlaygroundGnar
      return {
        generatedGnars: [newGnar, ...generatedGnars],
        counter: counter + 1,
      }
    })
  },
  clear: () => set({ generatedGnars: [] }),
}))

export default function Playground() {
  const gnarSize = useBreakpointValue({ base: "96px", lg: "128px" })
  const { generate, generatedGnars } = usePlaygroundState()
  return (
    <DarkMode>
      <VStack w={"full"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Heading>Playground</Heading>
        <VStack
          w={"full"}
          spacing={20}
          alignItems={"center"}
          py={{ base: 4, lg: 20 }}
          px={{ base: 4, lg: 20 }}
        >
          <VStack alignItems={"center"} alignContent={"center"}>
            <Wrap
              justify={"center"}
              w={"fit-content"}
              textStyle={"h2"}
              fontSize={{ base: 14, lg: 18 }}
              flexShrink={0}
            >
              <WrapItem>
                <PartPicker
                  part={"Head"}
                  partKind={"heads"}
                  icon={<HeadIcon boxSize={"24px"} />}
                  size={gnarSize}
                />
              </WrapItem>
              <WrapItem>
                <PartPicker
                  part={"Noggles"}
                  partKind={"glasses"}
                  icon={<NogglesIcon boxSize={"24px"} />}
                  size={gnarSize}
                />
              </WrapItem>
              <WrapItem>
                <PartPicker
                  part={"Body"}
                  partKind={"bodies"}
                  icon={<BodyIcon boxSize={"24px"} />}
                  size={gnarSize}
                />
              </WrapItem>
              <WrapItem>
                <PartPicker
                  part={"Accessory"}
                  partKind={"accessories"}
                  icon={<AccessoryIcon boxSize={"24px"} />}
                  size={gnarSize}
                />
              </WrapItem>
              <WrapItem>
                <PartPicker
                  part={"Background"}
                  partKind={"backgrounds"}
                  icon={
                    <FaSquareFull
                      style={{
                        display: "inline-block",
                        padding: "4px",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  }
                  size={gnarSize}
                />
              </WrapItem>
            </Wrap>
            <Button
              onClick={generate}
              bgColor={"yellow.200"}
              flexShrink={0}
              size={"lg"}
              w={"full"}
            >
              Generate
            </Button>
          </VStack>
          <Box
            minW={{ base: "full", lg: "4xl" }}
            maxW={"full"}
            minH={"lg"}
            bg={"blackAlpha.300"}
          >
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
                  <Gnar
                    key={`playground-gnar-${gnar.id}`}
                    gnarId={`playground-${gnar.id}`}
                    isOg={false}
                    gnartwork={gnar.gnartWork}
                    boxSize={gnarSize}
                    buttonProps={{ size: "xs" }}
                    buttonsStackProps={{ bottom: -8 }}
                    gridProps={{
                      templateColumns: "24px 1fr",
                      fontSize: "sm",
                      gap: 0,
                      p: 1,
                    }}
                    popoverProps={{ placement: "bottom-start" }}
                    mb={6}
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

export type PartPickerProps = {
  part: string
  partKind: PartKind
  icon: JSX.Element
  size: CSS.Property.Width | CSS.Property.Height | number
} & StackProps

export const PartPicker: FC<PartPickerProps> = ({
  part,
  partKind,
  icon,
  size,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    selectedParts: { [partKind]: selectedParts },
    parts: { [partKind]: parts },
    select,
    clearSelection,
  } = usePlaygroundState()
  const chosenPartImage = useMemo(() => {
    if (!selectedParts) {
      return <FaRandom size={"32px"} />
    }

    console.log({ selectedParts })

    const imageUrl = buildSvg([selectedParts[0]], gnarDataV2.palette)
    return <Image src={imageUrl} />
  }, [selectedParts])
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent
          mx={2}
          pb={4}
          color={"chakra-body-text"}
          bgColor={"chakra-body-bg"}
        >
          <ModalHeader textStyle={"h2"} textAlign={"center"}>
            {part} picker
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid templateColumns={"repeat(auto-fit, 96px)"} gridGap={2}>
              <Button
                p={0}
                h={"full"}
                w={"full"}
                variant={"outline"}
                isActive={!selectedParts}
                onClick={() => {
                  clearSelection(partKind)
                  onClose()
                }}
              >
                <VStack
                  h={"full"}
                  w={"full"}
                  alignItems={"center"}
                  justifyContent={"end"}
                >
                  <Text
                    fontSize={"xs"}
                    textAlign={"center"}
                    whiteSpace={"normal"}
                  >
                    Random
                  </Text>
                  <Center boxSize={"96px"}>
                    <FaRandom size={"32px"} />
                  </Center>
                </VStack>
              </Button>
              {parts.map((part, index) => {
                const imageUrl = buildPart(part)
                return (
                  <Button
                    key={part.trait}
                    p={0}
                    h={"full"}
                    w={"fit-content"}
                    variant={"outline"}
                    isActive={some(
                      selectedParts,
                      (selectedPart) => selectedPart.trait === part.trait
                    )}
                    onClick={() => {
                      select(partKind, part)
                      onClose()
                    }}
                  >
                    <VStack
                      h={"full"}
                      key={`part-${index}`}
                      alignItems={"center"}
                      justifyContent={"end"}
                    >
                      <Text
                        fontSize={"xs"}
                        textAlign={"center"}
                        whiteSpace={"normal"}
                      >
                        {part.trait}
                      </Text>
                      <Box>
                        <Image src={imageUrl} />
                      </Box>
                    </VStack>
                  </Button>
                )
              })}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack spacing={0} alignItems={"start"} {...props}>
        <Text>
          {icon} {part}
        </Text>
        <Button
          variant={"ghost"}
          p={0}
          onClick={onOpen}
          w={"fit-content"}
          h={"fit-content"}
        >
          <Center w={size} h={size} borderWidth={1} borderRadius={"md"}>
            {chosenPartImage}
          </Center>
        </Button>
      </VStack>
    </>
  )
}

const buildPart = memoize(
  (part: GnarPart) => buildSvg([part], gnarDataV2.palette),
  (part) => part.data
)
