import { useQuery } from "@tanstack/react-query"

interface Bid {
  sender: string
  amount: string
  timestamp: string
  transactionHash: string
}

interface GnarData {
  startTimestamp: string
  endTimestamp: string
  bids: Bid[]
  isLatestGnar: boolean
}

export default function useGnar(gnarId: number) {
  return useQuery(["gnar", gnarId], async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gnar/${gnarId}`)

    if (res.ok) {
      const data = (await res.json()) as GnarData
      return data
    }

    throw Error("Fetching gnar failed")
  })
}
