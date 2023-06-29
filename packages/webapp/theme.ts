import { avatarAnatomy, inputAnatomy, sliderAnatomy } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
  extendTheme,
  theme as chakraTheme,
} from "@chakra-ui/react"

import { Londrina_Solid } from "next/font/google"
const londrinaSolid = Londrina_Solid({
  weight: "400",
  subsets: ["latin"],
})

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
  governance: {
    vote: {
      for: chakraTheme.colors.green[500],
      against: chakraTheme.colors.red[400],
      abstain: chakraTheme.colors.gray[500],
    },
    quorum: chakraTheme.colors.green[900],
    proposal: {
      status: {
        pending: chakraTheme.colors.purple[500],
        active: chakraTheme.colors.purple[500],
        cancelled: chakraTheme.colors.gray[500],
        executed: chakraTheme.colors.green[500],
        queued: chakraTheme.colors.green[500],
        succeeded: chakraTheme.colors.green[500],
        vetoed: chakraTheme.colors.red[500],
        defeated: chakraTheme.colors.red[500],
        preview: chakraTheme.colors.pink[500],
      },
      event: {
        created: chakraTheme.colors.purple[500],
        cancelled: chakraTheme.colors.gray[500],
        executed: chakraTheme.colors.green[500],
        queued: chakraTheme.colors.green[500],
        vetoed: chakraTheme.colors.red[500],
      },
    },
  },
})

// case "PENDING":
//   return {
//     colorScheme: "orange",
//     variant: "subtle",
//   }
// case "ACTIVE":
//   return { colorScheme: "purple" }
// case "CANCELLED":
// case "UNDETERMINED":
//   return { colorScheme: "gray", color: "gray.300" }
// case "EXECUTED":
// case "QUEUED":
// case "SUCCEEDED":
//   return {
//     colorScheme: "green",
//   }
// case "VETOED":
//   return { colorScheme: "red" }
// case "DEFEATED":
//   return { colorScheme: "red" }
// case "PREVIEW":
//   return { colorScheme: "pink" }

const subtle = defineStyle((s) => ({
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
}))

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
  variants: { outline, subtle },
  baseStyle: {
    boxSizing: "border-box",
  },
})

const Heading = defineStyleConfig({
  baseStyle: {
    fontFamily: londrinaSolid.style.fontFamily,
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
      fontFamily: londrinaSolid.style.fontFamily,
      fontSize: { base: "5xl", sm: "8xl" },
      lineHeight: "120%",
    },
    h2: {
      fontFamily: londrinaSolid.style.fontFamily,
      fontSize: "3xl",
      lineHeight: "100%",
    },
    h3: {
      fontFamily: londrinaSolid.style.fontFamily,
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
