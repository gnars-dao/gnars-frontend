export interface UseContractAbiOptions {
  getImplementationAbi?: boolean
}

export interface ContractInfo {
  name: string
  abi: any
  address: `0x${string}`
  isProxy?: boolean
}

export interface ProxyContractInfo extends ContractInfo {
  implementationName: string
  implementationAbi: any
  implementationAddress: `0x${string}`
  isProxy: true
}

// WIP return ABI and contract name
// export const useContractInfo = (
//   address: string,
//   options: UseContractAbiOptions
// ): ContractInfo | undefined | null => {
//   const {
//     data: implementationAddress,
//     isLoading: isLoadingImplementationAddress,
//   } = useProxyImplementationAddress(
//     options.getImplementationAbi ? address : undefined
//   )

//   const queriedAddress =
//     options.getImplementationAbi && implementationAddress
//       ? implementationAddress
//       : address
//   const { data: etherscanAbi, isLoading: isLoadingEtherscanAbi } =
//     useEtherscanContractInfo(queriedAddress)
//   const { data: sourcifyAbi, isLoading: isLoadingSourcifyAbi } =
//     useSourcifyContractInfo(queriedAddress)

//   if (!isAddress(address)) return null

//   return {
//     abi: sourcifyAbi ?? etherscanAbi ?? null,
//     isLoading:
//       isLoadingImplementationAddress ||
//       isLoadingEtherscanAbi ||
//       isLoadingSourcifyAbi,
//   }
// }
