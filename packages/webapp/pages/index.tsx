import GnarSection from "components/Auction/GnarSection"
import Explainer from "components/Explainer"

import { GetServerSideProps, GetStaticProps } from "next"
import { fetchGnarData, GnarData } from "../hooks/useGnarData"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  return (
    <>
      <GnarSection />
      <Explainer />
    </>
  )
}
