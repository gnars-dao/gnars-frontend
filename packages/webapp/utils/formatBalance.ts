/**
 * Format a token balance with suffix
 * @param balance balance of token
 * @param decimals decimals of token
 * @returns formatted value
 */
export const formatSuffixedBalance = (balance: bigint, decimals: number): string => {
  const value = Math.abs(Number(balance) / 10 ** decimals)

  const suffixes = ["", "k", "M", "B", "T"]
  const order = Math.floor(Math.log10(value) / 3)
  const shortValue = parseFloat((value / Math.pow(1000, order)).toFixed(2))

  return shortValue + suffixes[order]
}