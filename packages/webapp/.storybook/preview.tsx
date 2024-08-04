import { Box, ChakraProvider, DarkMode } from "@chakra-ui/react"
import { Preview } from "@storybook/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { getDefaultClient } from "connectkit"
import React from "react"
import { createConfig, mainnet, WagmiConfig } from "wagmi"
import theme from "theme"
import { queryClient } from "utils"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
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
    (Story) => {
      const client = createConfig({
        ...getDefaultClient({
          appName: "Gnars",
          alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          chains: [mainnet]
        }),
        persister: null
      })

      return (
        <WagmiConfig config={client}>
          <Story />
        </WagmiConfig>
      )
    },
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
}

export default preview
