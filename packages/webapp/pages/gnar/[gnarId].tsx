import GnarSection from "components/Auction/GnarSection"
import Explainer from "components/Explainer"

import { GetStaticProps } from "next"
import { fetchGnarData, GnarData } from "../../hooks/useGnarData"

export default function GnarPage({
  gnarInfo,
  gnarId,
}: {
  gnarInfo: GnarData
  gnarId: number
}) {
  return (
    <>
      <GnarSection desiredGnarId={gnarId} initialGnarData={gnarInfo} />
      <Explainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gnarId = params?.gnarId
  if (typeof gnarId !== "string") {
    throw new Error("Invalid gnarId")
  }

  const gnarInfo = await fetchGnarData(parseInt(gnarId))

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
