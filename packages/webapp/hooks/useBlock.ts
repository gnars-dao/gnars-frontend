import { useProvider } from "wagmi"
import { useQuery } from "@tanstack/react-query"

export const useBlock = () => {
  const provider = useProvider()
  return useQuery(["block"], () => provider.getBlock("latest"), {
    refetchInterval: 12_000,
  }).data
}
