"use client"

import { ChakraProvider, DarkMode, VStack } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import Footer from "components/Footer"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import theme from "theme"
import { queryClient } from "utils"
import { createClient, mainnet, WagmiConfig } from "wagmi"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const client = createClient({
    ...getDefaultClient({
      appName: "Gnars",
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      chains: [mainnet],
    }),
    persister: null,
  })

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme={"midnight"}
          options={{ enforceSupportedChains: false, initialChainId: 1 }}
        >
          <QueryClientProvider client={queryClient}>
            <DarkMode>
              <html lang="en">
                <body>
                  <VStack minH={"full"} spacing={0}>
                    {children}
                    <Footer />
                  </VStack>
                  <Analytics debug={false} />
                </body>
              </html>
            </DarkMode>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
