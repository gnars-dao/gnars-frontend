// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/react18"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Box, ChakraProvider, DarkMode } from "@chakra-ui/react"
import theme from "../../theme"
import { WagmiConfig, createClient, mainnet } from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  const client = createClient({
    ...getDefaultClient({
      appName: "Gnars",
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      chains: [mainnet],
    }),
    persister: null,
  })

  const queryClient = new QueryClient()

  const wrapped = (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme={"midnight"}
          options={{ enforceSupportedChains: false, initialChainId: 1 }}
        >
          <QueryClientProvider client={queryClient}>
            <DarkMode>
              <Box color={"chakra-body-text"} bgColor={"chakra-body-bg"} p={2}>
                {component}
              </Box>
            </DarkMode>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )

  return mount(wrapped, options)
})

// Example use:
// cy.mount(<MyComponent />)
