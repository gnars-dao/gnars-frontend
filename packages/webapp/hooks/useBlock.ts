import { useQuery } from "@tanstack/react-query"
import { usePublicClient } from "wagmi"

export const useBlock = () => {
  const client = usePublicClient()
  if(typeof client === 'undefined') {
    throw Error(`hooks/useBlock usePublicClient => client is undefined`, client);
  }
  return useQuery({ queryKey: ["block"], queryFn: () => client.getBlock({ blockTag: "latest" }), 
    refetchInterval: 12_000,
  }).data
}
