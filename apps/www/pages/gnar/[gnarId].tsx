import Auction from "components/Auction"
import Explainer from "components/Explainer"

import { GetStaticProps } from "next"

export default function Gnar(props) {
  const { gnarId } = props

  return (
    <>
      <Auction desiredGnarId={Number(gnarId)} />
      <Explainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { gnarId } = context.params
  return {
    props: { gnarId },
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
