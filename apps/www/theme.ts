import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react"
import { avatarAnatomy } from "@chakra-ui/anatomy"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const outline = defineStyle({
  borderColor: "blackAlpha.300",
  _dark: {
    borderColor: "whiteAlpha.300",
  },
})

const solid = defineStyle({
  bg: "whiteAlpha.800",
  _hover: {
    bg: "whiteAlpha.900",
  },
  _active: {
    px: "14px",
    borderWidth: "2px",
    borderColor: "whiteAlpha.900",
    bg: "whiteAlpha.900",
  },
  _dark: {
    _active: {
      px: "14px",
      borderWidth: "2px",
      borderColor: "whiteAlpha.600",
      bg: "whiteAlpha.400",
    },
    _hover: {
      bg: "whiteAlpha.400",
    },
    bg: "whiteAlpha.300",
  },
})

const {
  definePartsStyle: defineAvatarPartsStyle,
  defineMultiStyleConfig: defineAvatarMultiStyleConfig,
} = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const avatarDelimitedVariant = defineAvatarPartsStyle({
  container: {
    borderWidth: "2px",
    borderColor: "blackAlpha.800",
    bg: "whiteAlpha.800",
    _dark: {
      bg: "whiteAlpha.500",
      borderColor: "whiteAlpha.800",
    },
  },
})

export const Avatar = defineAvatarMultiStyleConfig({
  variants: { delimited: avatarDelimitedVariant },
})

export const Button = defineStyleConfig({
  variants: { outline, solid },
  baseStyle: {
    boxSizing: "border-box",
  },
})

const Heading = defineStyleConfig({
  baseStyle: {
    fontFamily: '"Londrina Solid", sans-serif',
    fontWeight: "normal",
  },
  defaultProps: {
    size: "3xl",
  },
})

const StackDivider = defineStyleConfig({
  variants: {
    subtle: ({ colorMode }) => ({
      borderColor: colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300",
    }),
  },
})

const theme = extendTheme({
  ...config,
  components: { Button, Avatar, Heading, StackDivider },
  textStyles: {
    h1: {
      fontFamily: '"Londrina Solid", sans-serif',
      fontSize: { base: "5xl", sm: "8xl" },
      lineHeight: "120%",
    },
    h2: {
      fontFamily: '"Londrina Solid", sans-serif',
      fontSize: "3xl",
      lineHeight: "100%",
    },
    h3: {
      fontFamily: '"Londrina Solid", sans-serif',
      fontSize: "2xl",
      lineHeight: "100%",
    },
  },
  styles: {
    global: { body: { bg: "gray.800" } },
  },
})

export default theme
