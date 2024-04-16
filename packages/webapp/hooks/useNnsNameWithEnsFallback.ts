import { useNnsensReverseResolverResolve } from "utils/sdk"

export const useNnsNameWithEnsFallback = (address?: string) => {
  return useNnsensReverseResolverResolve({
    args: [address as `0x${string}`],
    enabled: !!address,
    select: (name: string) => name || undefined,
  })
}
