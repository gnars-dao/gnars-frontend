import { formatEther } from "viem"

export const formatEtherBalance = (balance: bigint) => formatEther(balance - (balance % 10000000000000000n))
