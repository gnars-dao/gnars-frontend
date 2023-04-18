import "../styles/global.css"
import type { AppProps } from "next/app"
import Footer from "components/Footer"
import { QueryClientProvider } from "@tanstack/react-query"
import { createClient, WagmiConfig } from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import {
  ChakraProvider,
  ColorModeScript,
  DarkMode,
  VStack,
} from "@chakra-ui/react"
import { Analytics } from "@vercel/analytics/react"

import { queryClient } from "utils"
import theme from "../theme"
import { mainnet } from "wagmi/chains"

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
              <VStack h={"full"} spacing={0}>
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
