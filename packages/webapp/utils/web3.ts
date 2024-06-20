import { FetchBalanceResult, fetchBalance } from "wagmi/actions"

/**
 * Fetch tokens for a wallet
 * @param holder token holder address
 * @param tokens list of tokens to find
 * @param chainId id of the chain
 * @returns the data of the tokens
 */
export function getTokensValues(
  holder: `0x${string}`,
  tokens: `0x${string}`[],
  chainId: number
): Promise<[FetchBalanceResult, ...FetchBalanceResult[]]> {
  try {
    const ethBalancePromise = fetchBalance({ address: holder, chainId })
    const balancePromises = tokens.map((token) => fetchBalance({ address: holder, token, chainId }))
    return Promise.all([ethBalancePromise, ...balancePromises])
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}