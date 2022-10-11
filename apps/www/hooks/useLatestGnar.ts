import { useQuery } from "@tanstack/react-query"

interface Bid {
  sender: string
  amount: string
  timestamp: string
  transactionHash: string
}

interface LatestGnarData {
  gnarId: number
  startTimestamp: string
  endTimestamp: string
  hasFinished: boolean
  bids: Bid[]
}

export default function useLatestGnar(refetch: number | false = false) {
  return useQuery(
    ["latest-gnar"],
    async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/latest-gnar`)

      if (res.ok) {
        const data = (await res.json()) as LatestGnarData
        return data
      }

      throw Error("Fetching latest gnar failed")
    },
    { refetchInterval: refetch }
  )
}
