import "../styles/global.css"
import type { AppProps } from "next/app"
import Footer from "components/Footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createClient, WagmiConfig } from "wagmi"
import { ConnectKitProvider, getDefaultClient } from "connectkit"

const queryClient = new QueryClient()
const client = createClient({
  ...getDefaultClient({
    appName: "Gnars",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }),
  persister: null,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
