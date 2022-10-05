import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { v2Gnar } from "utils/contracts"

interface UseGetGnarParams {
  gnarId: number
}

export default function useGetGnar(
  params: UseGetGnarParams,
  options: UseQueryOptions
) {
  const { gnarId } = params
  return useQuery(
    ["gnar", gnarId],
    async () => {
      return await v2Gnar.seeds(800)
    },
    options
  )
}
