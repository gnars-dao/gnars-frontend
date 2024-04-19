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
import { mainnet, sepolia, baseSepolia, base } from "wagmi/chains"
import { injected, walletConnect } from 'wagmi/connectors';

import theme from "../theme"
import { BaseAlertHeader } from 'components/BaseJumpAnnouncement';

// https://viem.sh/docs/clients/test#extending-with-public--wallet-actions
// @TODO Possibly add fallback https://viem.sh/docs/clients/transports/fallback#usage
const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), walletConnect({ projectId: walletConnectProjectId })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http()
  }
})

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
