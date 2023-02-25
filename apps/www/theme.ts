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
  _dark: {
    bg: "whiteAlpha.300",
  },
})

const {
  definePartsStyle: defineAvatarPartsStyle,
  defineMultiStyleConfig: defineAvatarMultiStyleConfig,
} = createMultiStyleConfigHelpers(avatarAnatomy.keys)

const avatarDelimitedVariant = defineAvatarPartsStyle({
  container: {
    borderWidth: "1px",
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
})

const theme = extendTheme({
  ...config,
  components: { Button, Avatar },
  styles: { global: { body: { bg: "gray.800" } } },
})

export default theme
