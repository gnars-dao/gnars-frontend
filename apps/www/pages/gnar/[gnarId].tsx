import { GetStaticProps } from "next"

export default function Gnar() {
  return "Gnar!"
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { gnarId } = context.params
  return {
    props: {},
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}
