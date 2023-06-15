// WIP adapt to return ContractInfo instead of just ABI
// export const useEtherscanContractInfo = (address: string) =>
//   useQuery(["etherscanAbi", address], async ({ signal }) => {
//     if (!isAddress(address)) return null

//     const res = await fetch(
//       `https://api.etherscan.io/api
//         ?module=contract
//         &action=getsourcecode
//         &address=${address}
//         &apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
//       { signal }
//     )

//     if (res.status !== 200) return null

//     return .then((res) => res.json())
//     .then((res) => JSON.parse(res.result))
//   })
