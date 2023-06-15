import { ChakraProvider, DarkMode, VStack } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import Footer from "components/Footer"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import type { AppProps } from "next/app"
import { createClient, WagmiConfig } from "wagmi"

import Head from "next/head"
import { queryClient } from "utils"
import { mainnet } from "wagmi/chains"
import theme from "../theme"

const client = createClient({
  ...getDefaultClient({
    appName: "Gnars",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chains: [mainnet],
  }),
  persister: null,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme={"midnight"}
          options={{ enforceSupportedChains: false, initialChainId: 1 }}
        >
          <QueryClientProvider client={queryClient}>
            <DarkMode>
              <VStack minH={"full"} spacing={0}>
                <Head>
                  <title>Gnars DAO</title>
                </Head>
                <Component {...pageProps} />
                <Footer />
              </VStack>
              <Analytics debug={false} />
            </DarkMode>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
