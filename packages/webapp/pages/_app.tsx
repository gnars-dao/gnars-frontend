import { ChakraProvider, DarkMode, Divider, VStack } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/react"
import Footer from "components/Footer"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import type { AppProps } from "next/app"
import { createConfig, WagmiProvider, http } from "wagmi"


import { walletConnectProjectId } from "constants/env"
import Head from "next/head"
import { queryClient } from "utils"
import { mainnet, sepolia } from "wagmi/chains"
import theme from "../theme"
import { BaseAlertHeader } from 'components/BaseJumpAnnouncement';

const config = createConfig(
  getDefaultConfig({
    appName: "Gnars",
    // TODO: Check if SSR prop is needed (defaults to false)
    ssr: false,
    // TODO: Determine if alchemy key is needed and where
    chains: [mainnet, sepolia],
    walletConnectProjectId,
    transports: {
      // TODO: replace example.com
      [mainnet.id]: http('https://mainnet.example.com'),
      [sepolia.id]: http('https://sepolia.example.com'),
    },
  }),
  // persister: null,
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme={"midnight"} options={{ enforceSupportedChains: false, initialChainId: 1 }}>
            <DarkMode>
              <VStack minH={"full"} spacing={10}>
                <Head>
                  <title>Gnars DAO</title>
                </Head>
                <BaseAlertHeader />
                <Component {...pageProps} />
                <Divider />
                <Footer />
              </VStack>
              <Analytics debug={false} />
            </DarkMode>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  )
}
