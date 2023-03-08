import Auction from "components/Auction"
import Explainer from "components/Explainer"

import { GetStaticProps } from "next"
import { fetchGnarInfo, GnarInfo } from "../../hooks/useGnarInfo"

export default function GnarPage({
  gnarInfo,
  gnarId,
}: {
  gnarInfo: GnarInfo
  gnarId: number
}) {
  return (
    <>
      <Auction desiredGnarId={gnarId} initialGnarInfo={gnarInfo} />
      <Explainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params: { gnarId },
}) => {
  if (typeof gnarId !== "string") {
    throw new Error("Invalid gnarId")
  }

  const gnarInfo = await fetchGnarInfo(parseInt(gnarId))

  return {
    props: { gnarId, gnarInfo },
    // 1 hour in seconds
    revalidate: 36000,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}
