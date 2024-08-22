import { GnarData, fetchGnarData } from "../hooks/useGnarData";
import GnarSection from "components/Auction/GnarSection";
import { BaseAnnouncementModal } from "components/BaseJumpAnnouncement";
import Explainer from "components/Explainer";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps, GetStaticProps } from "next";

export default function Home() {
  return (
    <>
      <GnarSection />
      <Explainer />
      <BaseAnnouncementModal />
    </>
  );
}
