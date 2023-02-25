import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react"

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

export const buttonTheme = defineStyleConfig({
  variants: { outline, solid },
})

const theme = extendTheme({
  ...config,
  components: { Button: buttonTheme },
  styles: { global: { body: { bg: "gray.800" } } },
})

export default theme
