import { DelegateDocument, execute } from ".graphclient"
import { useQuery } from "@tanstack/react-query"

export const delegationInfoQueryKey = (address?: `0x${string}`) => ["delegateProposals", address]

export const useDelegationInfo = (address?: `0x${string}`) => {
  return useQuery({
    queryKey: delegationInfoQueryKey(address),
    queryFn: () => execute(DelegateDocument, {id: address?.toLowerCase() })
                    .then((q: { data: any }) => q.data),
    enabled: !!address,
    refetchInterval: 15000
    // @TODO keepPreviousData is implementend different in react-query v5
    // keepPreviousData: true,
})
}
