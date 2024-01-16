export const formatUsdcBalance = (balance: bigint) => {
  const USDC_DECIMALS = 6
  const usdcValue = Math.abs(Number(balance) / 10 ** USDC_DECIMALS)

  if (usdcValue < 1000) return usdcValue.toString()

  const suffixes = ["", "k", "M", "B", "T"]
  const order = Math.floor(Math.log10(usdcValue) / 3)
  const shortValue = parseFloat((usdcValue / Math.pow(1000, order)).toFixed(2))
  console.log({ usdcValue, shortValue, order })
  return shortValue + suffixes[order]
}
