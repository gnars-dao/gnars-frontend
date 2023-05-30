import { Box, ChakraProvider, DarkMode } from "@chakra-ui/react"
import { Preview } from "@storybook/react"
import React from "react"
import theme from "../theme"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <DarkMode>
          <Box p={2} color={"chakra-body-text"}>
            <Story />
          </Box>
        </DarkMode>
      </ChakraProvider>
    ),
  ],
}

export default preview
