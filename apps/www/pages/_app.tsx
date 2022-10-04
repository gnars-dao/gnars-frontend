import "../styles/global.css"
import type { AppProps } from "next/app"
import Footer from "components/Footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </>
  )
}
