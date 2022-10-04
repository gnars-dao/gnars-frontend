import { GetStaticProps } from "next"

export default function Gnar() {
  return "Gnar!"
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { gnarId } = context.params
  return {
    props: {}, // will be passed to the page component as props
  }
}
