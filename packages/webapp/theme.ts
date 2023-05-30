import { avatarAnatomy, inputAnatomy, sliderAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react"

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

const colors = defineStyle({
  gnars: {
    logo: {
      yellow: "#fee761",
      orange: "#fb912b",
    },
  },
})

const solid = defineStyle({
  bg: "whiteAlpha.800",
  _hover: {
    bg: "whiteAlpha.900",
  },
  _active: {
    bg: "white",
    _hover: {
      bg: "white",
      _disabled: { bg: "whiteAlpha.800" },
    },
  },
  _dark: {
    _active: {
      bg: "whiteAlpha.600",
      _hover: { bg: "whiteAlpha.600" },
    },
    _hover: {
      bg: "whiteAlpha.400",
      _disabled: { bg: "whiteAlpha.300" },
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
    _dark: {
      borderColor: "whiteAlpha.800",
    },
  },
})

const Avatar = defineAvatarMultiStyleConfig({
  variants: { delimited: avatarDelimitedVariant },
})

const Button = defineStyleConfig({
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

const {
  definePartsStyle: defineInputPartsStyle,
  defineMultiStyleConfig: defineInputMultiStyleConfig,
} = createMultiStyleConfigHelpers(inputAnatomy.keys)

const inputVariantOutline = defineInputPartsStyle({
  field: {
    borderColor: "blackAlpha.300",
    _dark: {
      borderColor: "whiteAlpha.300",
    },
  },
})

const Input = defineInputMultiStyleConfig({
  variants: {
    outline: inputVariantOutline,
  },
})

const {
  definePartsStyle: defineSliderPartsStyle,
  defineMultiStyleConfig: defineSliderMultiStyleConfig,
} = createMultiStyleConfigHelpers(sliderAnatomy.keys)

const sliderBaseTheme = defineSliderPartsStyle({
  track: {
    bgColor: "blackAlpha.300",
    _dark: {
      bgColor: "whiteAlpha.300",
    },
  },
})

const Slider = defineSliderMultiStyleConfig({
  baseStyle: sliderBaseTheme,
})

const theme = extendTheme({
  ...config,
  colors,
  components: { Button, Avatar, Heading, StackDivider, Input, Slider },
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
    global: {
      body: { bg: "gray.800" },
      html: { scrollBehavior: "smooth" },
      "html, body, #__next": {
        height: "100%",
      },
    },
  },
})

export default theme
