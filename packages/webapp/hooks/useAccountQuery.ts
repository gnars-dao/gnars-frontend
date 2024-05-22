import { Address } from "abitype"
import { isValidName } from "utils/ensUtils"
import { isAddress } from "viem"
import { useEnsAddress, useEnsAvatar } from "wagmi"
import { useNnsNameWithEnsFallback } from "./useNnsNameWithEnsFallback"

export interface Account {
  address?: Address
  nnsOrEnsName?: string
  ensAvatar?: string
  isLoading: boolean
  isValid?: boolean
}

export const useAccountQuery = (addressOrEnsDomain?: string): Account => {
  const isValid = addressOrEnsDomain ? isAddress(addressOrEnsDomain) || isValidName(addressOrEnsDomain) : undefined
  const { data: ensAddress, isLoading: isLoadingEnsAddress } = useEnsAddress({
    name: isValidName(addressOrEnsDomain ?? "") ? addressOrEnsDomain : undefined,
  })
  const address = addressOrEnsDomain
    ? isAddress(addressOrEnsDomain)
      ? addressOrEnsDomain
      : ensAddress ?? undefined
    : undefined
  const { data: nnsOrEnsName, isLoading: isLoadingNnsOrEnsName } = useNnsNameWithEnsFallback(address)

  const { data: ensAvatar, isLoading: isLoadingEnsAvatar } = useEnsAvatar({
    name: String(nnsOrEnsName),
  })
  return {
    address,
    nnsOrEnsName: nnsOrEnsName ?? undefined,
    ensAvatar: ensAvatar ?? undefined,
    isLoading: isLoadingEnsAddress || isLoadingEnsAvatar || isLoadingNnsOrEnsName,
    isValid,
  }
}
