export const USE_QUERY_KEYS = {
  AUCTION_BIDS: "auction-bids",
  ARTWORK_PROPERTY_ITEMS_COUNT: "artwork-property-items-count",
  AUCTION_SETTLED: "auction-settled",
  AVERAGE_WINNING_BID: "average-winning-bid",
  ETH_USD: "eth-usd-price",
  TREASURY_SALES: "treasury-sales",
  NFT_COUNT: "nft-count",
  PROFILE_TOKENS: "profile-tokens",
  PROPOSAL: "proposal",
  PROPOSALS: "proposals",
  PROPOSALS_CALLDATAS: "proposals-calldatas",
  PROPOSALS_TRANSACTIONS: "proposal-transaction-data",
  ENS: "ens",
  EXPLORE: "explore",
  FEATURED: "featured",
  TOKEN: "token",
  AUCTION: "auction",
  DAO_INFO: "dao-info",
  DAO_FEED: "dao-feed",
  MEMBERS: "members",
  TOKEN_IMAGE: "token-image",
  DASHBOARD: "dashboard",
  METADATA_ATTRIBUTES_MERKLE_ROOT: "metadata-attributes-merkle-root",
  TOKEN_HOLDERS_MERKLE_ROOT: "token-holders-merkle-root",
  ENCODED_DAO_METADATA: "encoded-dao-metadata",
  DAO_MIGRATED: "dao-migrated",
  DAO_NEXT_AND_PREVIOUS_TOKENS: "dao-next-and-previous-tokens",
  DYNAMIC: {
    MY_DAOS(str: string) {
      return `my-daos-${str}`;
    },
    MY_DAOS_PAGE(str: string) {
      return `my-daos-page-${str}`;
    }
  }
};
