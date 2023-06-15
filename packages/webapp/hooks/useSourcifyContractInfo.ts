import { useQuery } from "@tanstack/react-query"
import { getAddress, isAddress } from "ethers/lib/utils.js"

export const useSourcifyContractInfo = (address: string) =>
  useQuery(["sourcifyFullMatchAbi", address], async ({ signal }) => {
    if (!isAddress(address)) return null

    const checksummedAddress = getAddress(address)

    const [fullMatch, partialMatch] = await Promise.all([
      fetch(
        `https://repo.sourcify.dev/contracts/full_match/1/${checksummedAddress}/metadata.json`,
        { signal }
      ),
      fetch(
        `https://repo.sourcify.dev/contracts/partial_match/1/${checksummedAddress}/metadata.json`,
        { signal }
      ),
    ])

    const match =
      fullMatch.status === 200
        ? fullMatch
        : partialMatch.status === 200
        ? partialMatch
        : null

    if (!match) return null

    // WIP return ContractInfo instead of just ABI
    return match.json().then((res) => res.output.abi)
  })
