import "../styles/global.css"
import type { AppProps } from "next/app"
import Footer from "components/Footer"
import { QueryClientProvider } from "@tanstack/react-query"
import { createClient, WagmiConfig } from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { ChakraProvider, ColorModeScript, DarkMode } from "@chakra-ui/react"

import { queryClient } from "utils"
import theme from "../theme"

const client = createClient({
  ...getDefaultClient({
    appName: "Gnars",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }),
  persister: null,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={"dark"} />
      <WagmiConfig client={client}>
        <ConnectKitProvider theme={"midnight"}>
          <QueryClientProvider client={queryClient}>
            <DarkMode>
              <Component {...pageProps} />
              <Footer />
            </DarkMode>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
