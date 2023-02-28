import Auction from "components/Auction"
import Explainer from "components/Explainer"

import { GetStaticProps } from "next"
import { fetchGnarInfo, GnarInfo } from "../hooks/useGnarInfo"

export default function Home({ gnarInfo }: { gnarInfo: GnarInfo }) {
  return (
    <>
      <Auction initialGnarInfo={gnarInfo} />
      <Explainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({}) => {
  const gnarInfo = await fetchGnarInfo()

  return {
    props: { gnarInfo },
    // 10 minutes in seconds
    revalidate: 600,
  }
}
