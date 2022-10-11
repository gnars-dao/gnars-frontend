import { useQuery } from "@tanstack/react-query"
import { v2Gnar } from "utils/contracts"

interface UseGetGnarSeedParams {
  gnarId: number
}

export default function useGetGnarSeed(params: UseGetGnarSeedParams) {
  const { gnarId } = params
  return useQuery(["gnar-seed", gnarId], async () => {
    return (await v2Gnar.seeds(gnarId)) as {
      background: number
      body: number
      accessory: number
      head: number
      glasses: number
    }
  })
}
