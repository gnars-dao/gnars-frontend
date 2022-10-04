import useLatestAuction from "hooks/useLatestAuction"

export default function LatestAuction() {
  const { isLoading, data } = useLatestAuction()
  console.log(data)
  return <div></div>
}
