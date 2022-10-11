import Explainer from "components/Explainer"
import Auction from "components/Auction"
import useLatestGnar from "hooks/useLatestGnar"

export default function Home() {
  const { isLoading: isAuctionLoading, data: gnarData } = useLatestGnar(10000)
  return (
    <>
      <Auction gnarId={gnarData?.gnarId} />
      <Explainer />
    </>
  )
}
