import { useState } from "react";
import { ChakraProvider, DarkMode, Divider, VStack } from "@chakra-ui/react";
import { BaseAlertHeader } from "@components/BaseJumpAnnouncement";
import Footer from "@components/Footer";
import { CHAIN_IDS } from "@constants/";
import { alchemyApiKey, walletConnectProjectId } from "@env/client.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "theme";
import { WagmiConfig, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";

const config = createConfig({
  ...getDefaultConfig({
    appName: "Gnars",
    alchemyId: alchemyApiKey,
    chains: [mainnet, base],
    walletConnectProjectId
  }),
  persister: null
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client side
            staleTime: 30 * 1000 // 30 seconds
          }
        }
      })
  );

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig config={config}>
        <ConnectKitProvider
          theme={"midnight"}
          options={{ enforceSupportedChains: false, initialChainId: CHAIN_IDS.BASE }}
        >
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}
