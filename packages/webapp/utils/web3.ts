import { ALCHEMY_RPC_URLS, CHAIN_IDS } from "@constants/networkConfig";
import { alchemyApiKey } from "@env/client.ts";
import { Block, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { FetchBalanceResult, fetchBalance } from "wagmi/actions";

const viemClient = createPublicClient({
  chain: mainnet,
  transport: http((ALCHEMY_RPC_URLS[CHAIN_IDS.ETHEREUM] + alchemyApiKey) as string)
});

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
  chainId?: number
): Promise<[FetchBalanceResult, ...FetchBalanceResult[]]> {
  const ethBalancePromise = fetchBalance({ address: holder, chainId });
  const balancePromises = tokens.map((token) => fetchBalance({ address: holder, token, chainId }));
  return Promise.all([ethBalancePromise, ...balancePromises]);
}

export async function getLatestEthereumBlock(): Promise<Block | undefined> {
  try {
    return viemClient.getBlock({ blockTag: "latest" });
  } catch (error) {
    console.error("Error fetching latest block:", error);
  }
}
