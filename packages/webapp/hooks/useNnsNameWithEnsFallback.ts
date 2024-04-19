import { useReadNnsensReverseResolverResolve } from "utils/sdk"

export const useNnsNameWithEnsFallback = (address?: string) => {
  return useReadNnsensReverseResolverResolve({
    args: [address as `0x${string}`],
    // @TODO Resolve the new param types
    // enabled: !!address,
    // select: (name: string) => name || undefined,
  })
}
