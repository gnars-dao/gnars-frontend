import { fetchBalance } from "wagmi/actions"

/**
 * Fetch tokens for a wallet
 * @param holder token holder address
 * @param tokens list of tokens to find
 * @returns the data of the tokens
 */
export function getTokensValues(holder: `0x${string}`, tokens: `0x${string}`[]) {
  const ethBalancePromise = fetchBalance({ address: holder })
  const balancePromises = tokens.map((token) => fetchBalance({ address: holder, token }))
  return Promise.all([ethBalancePromise, ...balancePromises])
}