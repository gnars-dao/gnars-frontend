import { useQuery } from "@tanstack/react-query"

export default function useLatestAuction() {
  return useQuery(["latest-auction"], async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/latest-auction`)
    const data = await res.json()
    return data
  })
}
