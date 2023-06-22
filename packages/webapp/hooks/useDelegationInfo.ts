import { DelegateDocument, execute } from ".graphclient"
import { useQuery } from "wagmi"

export const delegationInfoQueryKey = (address?: `0x${string}`) => [
  "delegateProposals",
  address,
]

export const useDelegationInfo = (address?: `0x${string}`) => {
  return useQuery(
    delegationInfoQueryKey(address),
    () =>
      execute(DelegateDocument, { id: address?.toLowerCase() }).then(
        (q) => q.data
      ),
    { keepPreviousData: true, enabled: !!address, refetchInterval: 15000 }
  )
}
