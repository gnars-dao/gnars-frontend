import { ChakraProvider, DarkMode, Divider, VStack } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import Footer from "components/Footer"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import type { AppProps } from "next/app"
import { createConfig, WagmiConfig } from "wagmi"

import { alchemyApiKey, walletConnectProjectId } from "constants/env"
import Head from "next/head"
import { queryClient } from "utils"
import { mainnet } from "wagmi/chains"
import theme from "../theme"

const config = createConfig({
  ...getDefaultConfig({
    appName: "Gnars",
    alchemyId: alchemyApiKey,
    chains: [mainnet],
    walletConnectProjectId,
  }),
  persister: null,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme={"midnight"} options={{ enforceSupportedChains: false, initialChainId: 1 }}>
          <QueryClientProvider client={queryClient}>
            <DarkMode>
              <VStack minH={"full"} spacing={10}>
                <Head>
                  <title>Gnars DAO</title>
                </Head>
                <Component {...pageProps} />
                <Divider />
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
