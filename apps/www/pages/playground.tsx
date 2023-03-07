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
} from "@chakra-ui/react"
import Menu from "../components/Menu"
import Footer from "../components/Footer"
import { times } from "lodash"
import { motion } from "framer-motion"
import {
  AccessoryIcon,
  BodyIcon,
  HeadIcon,
  NogglesIcon,
} from "../components/Icons"
import { FaRandom } from "react-icons/all"
import { FC } from "react"
import { IconType } from "react-icons"
import { jsx } from "@emotion/react"
import JSX = jsx.JSX

export default function Playground() {
  const gnarSize = useBreakpointValue({ base: "96px", lg: "128px" })
  return (
    <DarkMode>
      <VStack w={"full"} color={"chakra-body-text"} spacing={6}>
        <Menu />
        <Heading>Playground</Heading>
        <VStack
          w={"full"}
          h={"100vh"}
          spacing={20}
          alignItems={"center"}
          py={{ base: 4, lg: 20 }}
          px={{ base: 4, lg: 20 }}
        >
          <VStack alignItems={"center"} alignContent={"center"}>
            <Wrap
              justify={"center"}
              textStyle={"h2"}
              fontSize={6}
              flexShrink={0}
              spacing={0}
            >
              <WrapItem>
                <VStack>
                  <Text>
                    <HeadIcon boxSize={"24px"} /> Head
                  </Text>
                  <Center
                    boxSize={gnarSize}
                    borderWidth={1}
                    borderRadius={"md"}
                  >
                    <FaRandom size={"32px"} />
                  </Center>
                </VStack>

                <VStack>
                  <Text>
                    <NogglesIcon boxSize={"24px"} /> Noggles
                  </Text>
                  <Square size={gnarSize} borderWidth={1} borderRadius={"md"} />
                </VStack>

                <VStack>
                  <Text>
                    <BodyIcon boxSize={"24px"} /> Body
                  </Text>
                  <Square size={gnarSize} borderWidth={1} borderRadius={"md"} />
                </VStack>
              </WrapItem>
              <WrapItem>
                <VStack>
                  <Text>
                    <AccessoryIcon boxSize={"24px"} /> Accessory
                  </Text>
                  <Square size={gnarSize} borderWidth={1} borderRadius={"md"} />
                </VStack>

                <VStack>
                  <Text>Background</Text>
                  <Square size={gnarSize} borderWidth={1} borderRadius={"md"} />
                </VStack>
              </WrapItem>
            </Wrap>
            <Button flexShrink={0} size={"lg"} w={"full"}>
              Generate
            </Button>
          </VStack>
          <SimpleGrid
            borderRadius={"md"}
            gridTemplateColumns={`repeat(auto-fill, minmax(${gnarSize}, 1fr))`}
            spacing={4}
            bg={"blackAlpha.300"}
            w={"full"}
            p={[2, 4]}
            overflowY={"scroll"}
          >
            {times(32, (n) => (
              <Center key={`gnar-${n}`}>
                <Square
                  as={motion.div}
                  layoutId={`gnar-${n}`}
                  size={gnarSize}
                  borderWidth={1}
                  borderRadius={"md"}
                />
              </Center>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </DarkMode>
  )
}

export type PartPickerProps = {
  part: string
  icon: JSX.Element
  size: Token<CSS.Property.Width | CSS.Property.Height | number, "sizes">
} & StackProps

export const PartPicker: FC<PartPickerProps> = ({
  part,
  icon,
  size,
  ...props
}) => {
  return (
    <VStack {...props}>
      <Text>
        {icon} {part}
      </Text>
      <Center w={size} h={size} borderWidth={1} borderRadius={"md"}>
        <FaRandom size={"32px"} />
      </Center>
    </VStack>
  )
}
