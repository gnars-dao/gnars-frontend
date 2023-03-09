import { useProvider } from "wagmi"
import { useEffect, useMemo, useState } from "react"
import { cloneDeep, some } from "lodash"
import { Provider } from "@ethersproject/providers"
import { useQuery } from "@tanstack/react-query"

export const useNnsNameWithEnsFallback = (address?: string) => {
  const provider = useProvider()
  const chainId = provider.network.chainId
  const nnsProvider = useMemo<Provider | undefined>(() => {
    if (provider.network.chainId !== 1) return undefined

    const nnsProvider = cloneDeep(provider)
    nnsProvider.network.ensAddress =
      "0x3e1970dc478991b49c4327973ea8a4862ef5a4de"

    return nnsProvider
  }, [provider])

  return useQuery(
    ["nnsOrEnsName", address, chainId],
    () => {
      return Promise.all([
        nnsProvider?.lookupAddress(address),
        provider.lookupAddress(address),
      ]).then(([nnsName, ensName]) => nnsName ?? ensName)
    },
    { refetchInterval: 1000 * 60 * 5 }
  )
}
