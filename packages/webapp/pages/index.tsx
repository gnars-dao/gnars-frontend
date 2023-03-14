import GnarSection from "components/Auction/GnarSection"
import Explainer from "components/Explainer"

import { GetServerSideProps, GetStaticProps } from "next"
import { fetchGnarInfo, GnarInfo } from "../hooks/useGnarInfo"

export default function Home({ gnarInfo }: { gnarInfo: GnarInfo }) {
  return (
    <>
      <GnarSection initialGnarInfo={gnarInfo} />
      <Explainer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const gnarInfo = await fetchGnarInfo()
  return {
    props: { gnarInfo },
  }
}
