import clsx from "clsx"
import useGetGnar from "hooks/useGetGnar"
import useLatestAuction from "hooks/useLatestAuction"
import Menu from "./Menu"

export default function LatestAuction() {
  const {
    isLoading: isAuctionLoading,
    isSuccess: isAuctionSuccess,
    data: auctionData,
  } = useLatestAuction()
  const { data: gnarData } = useGetGnar(
    { gnarId: 628 },
    { enabled: isAuctionSuccess }
  )
  console.log(auctionData, gnarData)
  return (
    <div
      className={clsx(
        "flex flex-col w-full items-center text-primaryText",
        true && "dark"
      )}
    >
      <Menu />
    </div>
  )
}
