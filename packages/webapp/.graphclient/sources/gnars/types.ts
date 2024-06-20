// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GnarsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Account = {
  /** An Account is any address that holds any amount of Gnars, the id used is the blockchain address. */
  id: Scalars['ID']['output'];
  /** Delegate address of the token holder which will participate in votings. Delegates don't need to hold any tokens and can even be the token holder itself. */
  delegate?: Maybe<Delegate>;
  /** Gnar balance of this address expressed in the smallest unit of the Gnars ERC721 Token */
  tokenBalanceRaw: Scalars['BigInt']['output'];
  /** Gnar balance of this address expressed as a BigInt normalized value for the Gnars ERC721 Token */
  tokenBalance: Scalars['BigInt']['output'];
  /** Total amount of Gnars ever held by this address expressed in the smallest unit of the Gnars ERC721 Token */
  totalTokensHeldRaw: Scalars['BigInt']['output'];
  /** Total amount of Gnars ever held by this address expressed as a BigInt normalized value for the Gnars ERC721 Token */
  totalTokensHeld: Scalars['BigInt']['output'];
  /** The Gnars owned by this account */
  gnars: Array<Gnar>;
};


export type AccountgnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};

export type Account_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  delegate?: InputMaybe<Scalars['String']['input']>;
  delegate_not?: InputMaybe<Scalars['String']['input']>;
  delegate_gt?: InputMaybe<Scalars['String']['input']>;
  delegate_lt?: InputMaybe<Scalars['String']['input']>;
  delegate_gte?: InputMaybe<Scalars['String']['input']>;
  delegate_lte?: InputMaybe<Scalars['String']['input']>;
  delegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_?: InputMaybe<Delegate_filter>;
  tokenBalanceRaw?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalanceRaw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenBalanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenBalance?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensHeldRaw?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeldRaw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensHeldRaw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensHeld?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokensHeld_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokensHeld_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gnars?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_?: InputMaybe<Gnar_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Account_filter>>>;
};

export type Account_orderBy =
  | 'id'
  | 'delegate'
  | 'delegate__id'
  | 'delegate__delegatedVotesRaw'
  | 'delegate__delegatedVotes'
  | 'delegate__tokenHoldersRepresentedAmount'
  | 'tokenBalanceRaw'
  | 'tokenBalance'
  | 'totalTokensHeldRaw'
  | 'totalTokensHeld'
  | 'gnars';

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type Auction = {
  /** The Gnar's ERC721 token id */
  id: Scalars['ID']['output'];
  /** The Gnar */
  gnar: Gnar;
  /** The current highest bid amount */
  amount: Scalars['BigInt']['output'];
  /** The time that the auction started */
  startTime: Scalars['BigInt']['output'];
  /** The time that the auction is scheduled to end */
  endTime: Scalars['BigInt']['output'];
  /** The account with the current highest bid */
  bidder?: Maybe<Account>;
  /** Whether or not the auction has been settled */
  settled: Scalars['Boolean']['output'];
  /** The auction bids */
  bids: Array<Bid>;
};


export type AuctionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};

export type AuctionHouse = {
  /** Unique entity used to keep track of AuctionHouse settings */
  id: Scalars['ID']['output'];
  /** The minimum value for bids */
  reservePrice: Scalars['BigInt']['output'];
  /** The minimum time left on an Auction after a new bid is placed */
  timeBuffer: Scalars['BigInt']['output'];
};

export type AuctionHouse_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  reservePrice?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reservePrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeBuffer?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_not?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeBuffer_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuctionHouse_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AuctionHouse_filter>>>;
};

export type AuctionHouse_orderBy =
  | 'id'
  | 'reservePrice'
  | 'timeBuffer';

export type Auction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<Gnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['String']['input']>;
  bidder_not?: InputMaybe<Scalars['String']['input']>;
  bidder_gt?: InputMaybe<Scalars['String']['input']>;
  bidder_lt?: InputMaybe<Scalars['String']['input']>;
  bidder_gte?: InputMaybe<Scalars['String']['input']>;
  bidder_lte?: InputMaybe<Scalars['String']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bidder_contains?: InputMaybe<Scalars['String']['input']>;
  bidder_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['String']['input']>;
  bidder_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_starts_with?: InputMaybe<Scalars['String']['input']>;
  bidder_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_ends_with?: InputMaybe<Scalars['String']['input']>;
  bidder_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_?: InputMaybe<Account_filter>;
  settled?: InputMaybe<Scalars['Boolean']['input']>;
  settled_not?: InputMaybe<Scalars['Boolean']['input']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  bids_?: InputMaybe<Bid_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Auction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Auction_filter>>>;
};

export type Auction_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__creationTimestamp'
  | 'gnar__hdOwner'
  | 'amount'
  | 'startTime'
  | 'endTime'
  | 'bidder'
  | 'bidder__id'
  | 'bidder__tokenBalanceRaw'
  | 'bidder__tokenBalance'
  | 'bidder__totalTokensHeldRaw'
  | 'bidder__totalTokensHeld'
  | 'settled'
  | 'bids';

export type Bid = {
  /** Bid transaction hash */
  id: Scalars['ID']['output'];
  /** The Gnar being bid on */
  gnar: Gnar;
  /** Bid amount */
  amount: Scalars['BigInt']['output'];
  /** Bidder account */
  bidder?: Maybe<Account>;
  /** Block number of the bid */
  blockNumber: Scalars['BigInt']['output'];
  /** Index of transaction within block */
  txIndex: Scalars['BigInt']['output'];
  /** The auction being bid in */
  auction: Auction;
  /** The timestamp of the block the bid is in */
  blockTimestamp: Scalars['BigInt']['output'];
};

export type Bid_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<Gnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['String']['input']>;
  bidder_not?: InputMaybe<Scalars['String']['input']>;
  bidder_gt?: InputMaybe<Scalars['String']['input']>;
  bidder_lt?: InputMaybe<Scalars['String']['input']>;
  bidder_gte?: InputMaybe<Scalars['String']['input']>;
  bidder_lte?: InputMaybe<Scalars['String']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bidder_contains?: InputMaybe<Scalars['String']['input']>;
  bidder_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['String']['input']>;
  bidder_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_starts_with?: InputMaybe<Scalars['String']['input']>;
  bidder_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_ends_with?: InputMaybe<Scalars['String']['input']>;
  bidder_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidder_?: InputMaybe<Account_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txIndex?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction?: InputMaybe<Scalars['String']['input']>;
  auction_not?: InputMaybe<Scalars['String']['input']>;
  auction_gt?: InputMaybe<Scalars['String']['input']>;
  auction_lt?: InputMaybe<Scalars['String']['input']>;
  auction_gte?: InputMaybe<Scalars['String']['input']>;
  auction_lte?: InputMaybe<Scalars['String']['input']>;
  auction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_contains?: InputMaybe<Scalars['String']['input']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_?: InputMaybe<Auction_filter>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
};

export type Bid_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__creationTimestamp'
  | 'gnar__hdOwner'
  | 'amount'
  | 'bidder'
  | 'bidder__id'
  | 'bidder__tokenBalanceRaw'
  | 'bidder__tokenBalance'
  | 'bidder__totalTokensHeldRaw'
  | 'bidder__totalTokensHeld'
  | 'blockNumber'
  | 'txIndex'
  | 'auction'
  | 'auction__id'
  | 'auction__amount'
  | 'auction__startTime'
  | 'auction__endTime'
  | 'auction__settled'
  | 'blockTimestamp';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Delegate = {
  /** A Delegate is any address that has been delegated with voting tokens by a token holder, id is the blockchain address of said delegate */
  id: Scalars['ID']['output'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed in the smallest unit of the Gnars ERC721 Token */
  delegatedVotesRaw: Scalars['BigInt']['output'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed as a BigInt normalized value for the Gnars ERC721 Token */
  delegatedVotes: Scalars['BigInt']['output'];
  tokenHoldersRepresentedAmount: Scalars['Int']['output'];
  /** Token holders that this delegate represents */
  tokenHoldersRepresented: Array<Account>;
  /** Gnars that this delegate represents */
  gnarsRepresented: Array<Gnar>;
  /** Votes that a delegate has made in different proposals */
  votes: Array<Vote>;
  /** Proposals that the delegate has created */
  proposals: Array<Proposal>;
};


export type DelegatetokenHoldersRepresentedArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
};


export type DelegategnarsRepresentedArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};


export type DelegatevotesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};


export type DelegateproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
};

export type Delegate_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotes?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenHoldersRepresentedAmount?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_not?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenHoldersRepresentedAmount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenHoldersRepresentedAmount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenHoldersRepresented_?: InputMaybe<Account_filter>;
  gnarsRepresented?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_not?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnarsRepresented_?: InputMaybe<Gnar_filter>;
  votes_?: InputMaybe<Vote_filter>;
  proposals_?: InputMaybe<Proposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Delegate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Delegate_filter>>>;
};

export type Delegate_orderBy =
  | 'id'
  | 'delegatedVotesRaw'
  | 'delegatedVotes'
  | 'tokenHoldersRepresentedAmount'
  | 'tokenHoldersRepresented'
  | 'gnarsRepresented'
  | 'votes'
  | 'proposals';

export type DelegationEvent = {
  /** The txn hash of this event + gnarId */
  id: Scalars['ID']['output'];
  /** The Gnar being delegated */
  gnar: Gnar;
  /** Previous delegate address */
  previousDelegate: Delegate;
  /** New delegate address */
  newDelegate: Delegate;
  /** Block number of the event */
  blockNumber: Scalars['BigInt']['output'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt']['output'];
};

export type DelegationEvent_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<Gnar_filter>;
  previousDelegate?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_gt?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_lt?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_gte?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_lte?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousDelegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousDelegate_contains?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousDelegate_?: InputMaybe<Delegate_filter>;
  newDelegate?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not?: InputMaybe<Scalars['String']['input']>;
  newDelegate_gt?: InputMaybe<Scalars['String']['input']>;
  newDelegate_lt?: InputMaybe<Scalars['String']['input']>;
  newDelegate_gte?: InputMaybe<Scalars['String']['input']>;
  newDelegate_lte?: InputMaybe<Scalars['String']['input']>;
  newDelegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newDelegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newDelegate_contains?: InputMaybe<Scalars['String']['input']>;
  newDelegate_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_starts_with?: InputMaybe<Scalars['String']['input']>;
  newDelegate_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_ends_with?: InputMaybe<Scalars['String']['input']>;
  newDelegate_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newDelegate_?: InputMaybe<Delegate_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DelegationEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DelegationEvent_filter>>>;
};

export type DelegationEvent_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__creationTimestamp'
  | 'gnar__hdOwner'
  | 'previousDelegate'
  | 'previousDelegate__id'
  | 'previousDelegate__delegatedVotesRaw'
  | 'previousDelegate__delegatedVotes'
  | 'previousDelegate__tokenHoldersRepresentedAmount'
  | 'newDelegate'
  | 'newDelegate__id'
  | 'newDelegate__delegatedVotesRaw'
  | 'newDelegate__delegatedVotes'
  | 'newDelegate__tokenHoldersRepresentedAmount'
  | 'blockNumber'
  | 'blockTimestamp';

export type DynamicQuorumParams = {
  /** Unique entity used to store the latest dynamic quorum params */
  id: Scalars['ID']['output'];
  /** Min quorum basis points */
  minQuorumVotesBPS: Scalars['Int']['output'];
  /** Max quorum basis points */
  maxQuorumVotesBPS: Scalars['Int']['output'];
  /** The dynamic quorum coefficient */
  quorumCoefficient: Scalars['BigInt']['output'];
  /** The block from which proposals are using DQ, based on when we first see configuration being set */
  dynamicQuorumStartBlock?: Maybe<Scalars['BigInt']['output']>;
};

export type DynamicQuorumParams_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  minQuorumVotesBPS?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_not?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  minQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxQuorumVotesBPS?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_not?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  quorumCoefficient?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumCoefficient_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dynamicQuorumStartBlock?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dynamicQuorumStartBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dynamicQuorumStartBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DynamicQuorumParams_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DynamicQuorumParams_filter>>>;
};

export type DynamicQuorumParams_orderBy =
  | 'id'
  | 'minQuorumVotesBPS'
  | 'maxQuorumVotesBPS'
  | 'quorumCoefficient'
  | 'dynamicQuorumStartBlock';

export type Gnar = {
  /** The Gnar's ERC721 token id */
  id: Scalars['ID']['output'];
  /** The Gnar's creation timestamp */
  creationTimestamp: Scalars['BigInt']['output'];
  /** The seed used to determine the Gnar's traits */
  seed?: Maybe<Seed>;
  /** The owner of the Gnar */
  owner: Account;
  /** The address of the HD Gnar counterpart last claimer */
  hdOwner: Scalars['Bytes']['output'];
  /** Historical votes for the Gnar */
  votes: Array<Vote>;
  /** The Gnar's auction */
  auction?: Maybe<Auction>;
};


export type GnarvotesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};

export type Gnar_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seed?: InputMaybe<Scalars['String']['input']>;
  seed_not?: InputMaybe<Scalars['String']['input']>;
  seed_gt?: InputMaybe<Scalars['String']['input']>;
  seed_lt?: InputMaybe<Scalars['String']['input']>;
  seed_gte?: InputMaybe<Scalars['String']['input']>;
  seed_lte?: InputMaybe<Scalars['String']['input']>;
  seed_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seed_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  seed_contains?: InputMaybe<Scalars['String']['input']>;
  seed_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_not_contains?: InputMaybe<Scalars['String']['input']>;
  seed_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_starts_with?: InputMaybe<Scalars['String']['input']>;
  seed_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  seed_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_ends_with?: InputMaybe<Scalars['String']['input']>;
  seed_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  seed_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  seed_?: InputMaybe<Seed_filter>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_filter>;
  hdOwner?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hdOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  hdOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  hdOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  votes_?: InputMaybe<Vote_filter>;
  auction?: InputMaybe<Scalars['String']['input']>;
  auction_not?: InputMaybe<Scalars['String']['input']>;
  auction_gt?: InputMaybe<Scalars['String']['input']>;
  auction_lt?: InputMaybe<Scalars['String']['input']>;
  auction_gte?: InputMaybe<Scalars['String']['input']>;
  auction_lte?: InputMaybe<Scalars['String']['input']>;
  auction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_contains?: InputMaybe<Scalars['String']['input']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_?: InputMaybe<Auction_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Gnar_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Gnar_filter>>>;
};

export type Gnar_orderBy =
  | 'id'
  | 'creationTimestamp'
  | 'seed'
  | 'seed__id'
  | 'seed__background'
  | 'seed__body'
  | 'seed__accessory'
  | 'seed__head'
  | 'seed__glasses'
  | 'owner'
  | 'owner__id'
  | 'owner__tokenBalanceRaw'
  | 'owner__tokenBalance'
  | 'owner__totalTokensHeldRaw'
  | 'owner__totalTokensHeld'
  | 'hdOwner'
  | 'votes'
  | 'auction'
  | 'auction__id'
  | 'auction__amount'
  | 'auction__startTime'
  | 'auction__endTime'
  | 'auction__settled';

export type Gnarving = {
  /** Unique entity used to keep track of the Gnarving events */
  id: Scalars['ID']['output'];
  /** Amount of Gnarvings that have happened */
  gnarvings: Scalars['BigInt']['output'];
  /** Amount of auctions that separate Gnarvings */
  auctionsBetweenGnarvings: Scalars['BigInt']['output'];
  /** Amount of auctions left until next gnarving */
  auctionsUntilNextGnarving: Scalars['BigInt']['output'];
  /** Auction duration at launch */
  initialAuctionDuration: Scalars['BigInt']['output'];
  /** Current auction duration */
  auctionDuration: Scalars['BigInt']['output'];
};

export type Gnarving_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnarvings?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_not?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gnarvings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gnarvings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionsBetweenGnarvings?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsBetweenGnarvings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionsBetweenGnarvings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionsUntilNextGnarving?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionsUntilNextGnarving_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionsUntilNextGnarving_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initialAuctionDuration?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  initialAuctionDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initialAuctionDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionDuration?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  auctionDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auctionDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Gnarving_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Gnarving_filter>>>;
};

export type Gnarving_orderBy =
  | 'id'
  | 'gnarvings'
  | 'auctionsBetweenGnarvings'
  | 'auctionsUntilNextGnarving'
  | 'initialAuctionDuration'
  | 'auctionDuration';

export type Governance = {
  /** Unique entity used to keep track of common aggregated data */
  id: Scalars['ID']['output'];
  /** Number of proposals created */
  proposals: Scalars['BigInt']['output'];
  /** Total number of token holders currently */
  currentTokenHolders: Scalars['BigInt']['output'];
  /** Total number of delegates participating on the governance currently */
  currentDelegates: Scalars['BigInt']['output'];
  /** Total number of token holders */
  totalTokenHolders: Scalars['BigInt']['output'];
  /** Total number of delegates that held delegated votes */
  totalDelegates: Scalars['BigInt']['output'];
  /** Total number of votes delegated expressed in the smallest unit of the Gnars ERC721 Token */
  delegatedVotesRaw: Scalars['BigInt']['output'];
  /** Total number of votes delegated expressed as a BigInt normalized value for the Gnars ERC721 Token */
  delegatedVotes: Scalars['BigInt']['output'];
  /** Number of proposals currently queued for execution */
  proposalsQueued: Scalars['BigInt']['output'];
};

export type Governance_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  proposals?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentTokenHolders?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentDelegates?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_not?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentDelegates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokenHolders?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegates?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDelegates_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotes?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalsQueued?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalsQueued_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalsQueued_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Governance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Governance_filter>>>;
};

export type Governance_orderBy =
  | 'id'
  | 'proposals'
  | 'currentTokenHolders'
  | 'currentDelegates'
  | 'totalTokenHolders'
  | 'totalDelegates'
  | 'delegatedVotesRaw'
  | 'delegatedVotes'
  | 'proposalsQueued';

export type OgAuction = {
  /** The OG Gnar's ERC721 token id */
  id: Scalars['ID']['output'];
  /** The Gnar */
  gnar: OgGnar;
  /** The current highest bid amount */
  amount: Scalars['BigInt']['output'];
  /** The block number at which the auction started */
  startBlock: Scalars['BigInt']['output'];
  /** The block number at which the auction ends */
  endBlock: Scalars['BigInt']['output'];
  /** The wallet with the current highest bid */
  bidder: Scalars['Bytes']['output'];
  /** Whether or not the auction has been settled */
  settled: Scalars['Boolean']['output'];
  /** The auction bids */
  bids: Array<OgBid>;
};


export type OgAuctionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
};

export type OgAuction_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  settled?: InputMaybe<Scalars['Boolean']['input']>;
  settled_not?: InputMaybe<Scalars['Boolean']['input']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  bids_?: InputMaybe<OgBid_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OgAuction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OgAuction_filter>>>;
};

export type OgAuction_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__background'
  | 'gnar__body'
  | 'gnar__accessory'
  | 'gnar__head'
  | 'gnar__glasses'
  | 'gnar__owner'
  | 'gnar__wasClaimed'
  | 'amount'
  | 'startBlock'
  | 'endBlock'
  | 'bidder'
  | 'settled'
  | 'bids';

export type OgBid = {
  /** Bid transaction hash */
  id: Scalars['ID']['output'];
  /** The OG Gnar being bid on */
  gnar: OgGnar;
  /** Bid amount */
  amount: Scalars['BigInt']['output'];
  /** Bidder bytes */
  bidder: Scalars['Bytes']['output'];
  /** Block number of the bid */
  blockNumber: Scalars['BigInt']['output'];
  /** Index of transaction within block */
  txIndex: Scalars['BigInt']['output'];
  /** The auction being bid in */
  auction: OgAuction;
  /** The timestamp of the block the bid is in */
  blockTimestamp: Scalars['BigInt']['output'];
};

export type OgBid_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txIndex?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  auction?: InputMaybe<Scalars['String']['input']>;
  auction_not?: InputMaybe<Scalars['String']['input']>;
  auction_gt?: InputMaybe<Scalars['String']['input']>;
  auction_lt?: InputMaybe<Scalars['String']['input']>;
  auction_gte?: InputMaybe<Scalars['String']['input']>;
  auction_lte?: InputMaybe<Scalars['String']['input']>;
  auction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_contains?: InputMaybe<Scalars['String']['input']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_?: InputMaybe<OgAuction_filter>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OgBid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OgBid_filter>>>;
};

export type OgBid_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__background'
  | 'gnar__body'
  | 'gnar__accessory'
  | 'gnar__head'
  | 'gnar__glasses'
  | 'gnar__owner'
  | 'gnar__wasClaimed'
  | 'amount'
  | 'bidder'
  | 'blockNumber'
  | 'txIndex'
  | 'auction'
  | 'auction__id'
  | 'auction__amount'
  | 'auction__startBlock'
  | 'auction__endBlock'
  | 'auction__bidder'
  | 'auction__settled'
  | 'blockTimestamp';

export type OgGnar = {
  /** The OG Gnar's ERC721 token id */
  id: Scalars['ID']['output'];
  /** The background index */
  background: Scalars['BigInt']['output'];
  /** The body index */
  body: Scalars['BigInt']['output'];
  /** The accessory index */
  accessory: Scalars['BigInt']['output'];
  /** The head index */
  head: Scalars['BigInt']['output'];
  /** The glasses index */
  glasses: Scalars['BigInt']['output'];
  /** The owner of the OG Gnar */
  owner: Scalars['Bytes']['output'];
  /** Was OG Gnar used to claim the 2 Gnars it's entitled to */
  wasClaimed: Scalars['Boolean']['output'];
};

export type OgGnar_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  background?: InputMaybe<Scalars['BigInt']['input']>;
  background_not?: InputMaybe<Scalars['BigInt']['input']>;
  background_gt?: InputMaybe<Scalars['BigInt']['input']>;
  background_lt?: InputMaybe<Scalars['BigInt']['input']>;
  background_gte?: InputMaybe<Scalars['BigInt']['input']>;
  background_lte?: InputMaybe<Scalars['BigInt']['input']>;
  background_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  background_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  body?: InputMaybe<Scalars['BigInt']['input']>;
  body_not?: InputMaybe<Scalars['BigInt']['input']>;
  body_gt?: InputMaybe<Scalars['BigInt']['input']>;
  body_lt?: InputMaybe<Scalars['BigInt']['input']>;
  body_gte?: InputMaybe<Scalars['BigInt']['input']>;
  body_lte?: InputMaybe<Scalars['BigInt']['input']>;
  body_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  body_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  accessory?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_not?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_gt?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_lt?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_gte?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_lte?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  accessory_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  head?: InputMaybe<Scalars['BigInt']['input']>;
  head_not?: InputMaybe<Scalars['BigInt']['input']>;
  head_gt?: InputMaybe<Scalars['BigInt']['input']>;
  head_lt?: InputMaybe<Scalars['BigInt']['input']>;
  head_gte?: InputMaybe<Scalars['BigInt']['input']>;
  head_lte?: InputMaybe<Scalars['BigInt']['input']>;
  head_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  head_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  glasses?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_not?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_gt?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_lt?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_gte?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_lte?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  glasses_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  wasClaimed?: InputMaybe<Scalars['Boolean']['input']>;
  wasClaimed_not?: InputMaybe<Scalars['Boolean']['input']>;
  wasClaimed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  wasClaimed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OgGnar_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OgGnar_filter>>>;
};

export type OgGnar_orderBy =
  | 'id'
  | 'background'
  | 'body'
  | 'accessory'
  | 'head'
  | 'glasses'
  | 'owner'
  | 'wasClaimed';

export type OgTransferEvent = {
  /** The txn hash of this event */
  id: Scalars['ID']['output'];
  /** The OG Gnar being transfered */
  gnar: OgGnar;
  /** Previous holder address */
  previousHolder: Scalars['Bytes']['output'];
  /** New holder address */
  newHolder: Scalars['Bytes']['output'];
  /** Block number of the event */
  blockNumber: Scalars['BigInt']['output'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt']['output'];
};

export type OgTransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  previousHolder?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousHolder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousHolder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousHolder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_not?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newHolder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newHolder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newHolder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OgTransferEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OgTransferEvent_filter>>>;
};

export type OgTransferEvent_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__background'
  | 'gnar__body'
  | 'gnar__accessory'
  | 'gnar__head'
  | 'gnar__glasses'
  | 'gnar__owner'
  | 'gnar__wasClaimed'
  | 'previousHolder'
  | 'newHolder'
  | 'blockNumber'
  | 'blockTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Proposal = {
  /** Internal proposal ID, in this implementation it seems to be a autoincremental id */
  id: Scalars['ID']['output'];
  /** Delegate that proposed the change */
  proposer: Delegate;
  /** Targets data for the change */
  targets?: Maybe<Array<Scalars['Bytes']['output']>>;
  /** Values data for the change */
  values?: Maybe<Array<Scalars['BigInt']['output']>>;
  /** Signature data for the change */
  signatures?: Maybe<Array<Scalars['String']['output']>>;
  /** Call data for the change */
  calldatas?: Maybe<Array<Scalars['Bytes']['output']>>;
  /** The proposal creation timestamp */
  createdTimestamp: Scalars['BigInt']['output'];
  /** The proposal creation block */
  createdBlock: Scalars['BigInt']['output'];
  /** The proposal creation transaction hash */
  createdTransactionHash: Scalars['Bytes']['output'];
  /** Block number from where the voting starts */
  startBlock: Scalars['BigInt']['output'];
  /** Block number from where the voting ends */
  endBlock: Scalars['BigInt']['output'];
  /** The proposal threshold at the time of proposal creation */
  proposalThreshold: Scalars['BigInt']['output'];
  /** The required number of votes for quorum at the time of proposal creation */
  quorumVotes: Scalars['BigInt']['output'];
  /** The number of votes in favor of the proposal */
  forVotes: Scalars['BigInt']['output'];
  /** The number of votes against of the proposal */
  againstVotes: Scalars['BigInt']['output'];
  /** The number of votes to abstain on the proposal */
  abstainVotes: Scalars['BigInt']['output'];
  /** The proposal title, parsed from the description */
  title: Scalars['String']['output'];
  /** The full proposal description, which includes the title */
  description: Scalars['String']['output'];
  /** Status of the proposal */
  status: ProposalStatus;
  /** Once the proposal is queued for execution it will have an ETA of the execution */
  executionETA?: Maybe<Scalars['BigInt']['output']>;
  /** Votes associated to this proposal */
  votes: Array<Vote>;
  /** Lifecycle events associated to this proposal */
  events: Array<ProposalLifecycleEvent>;
  /** Total supply when this proposal was created */
  totalSupply: Scalars['BigInt']['output'];
  /** Dynamic quorum param snapshot: min quorum basis points */
  minQuorumVotesBPS: Scalars['Int']['output'];
  /** Dynamic quorum param snapshot: max quorum basis points */
  maxQuorumVotesBPS: Scalars['Int']['output'];
  /** Dynamic quorum param snapshot: the dynamic quorum coefficient */
  quorumCoefficient: Scalars['BigInt']['output'];
};


export type ProposalvotesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};


export type ProposaleventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
};

export type ProposalLifecycleEvent = {
  /** Proposal ID + EventKind */
  id: Scalars['ID']['output'];
  kind: ProposalLifecycleEventKind;
  /** Proposal this event belongs to */
  proposal: Proposal;
  /** Account that initiaded the event */
  from: Scalars['Bytes']['output'];
  /** The event transaction hash */
  txHash: Scalars['Bytes']['output'];
  /** Block number of event */
  blockNumber: Scalars['BigInt']['output'];
  /** The timestamp of event */
  blockTimestamp: Scalars['BigInt']['output'];
  /** The vote that triggered this event, if it's a vote event */
  vote?: Maybe<Vote>;
};

export type ProposalLifecycleEventKind =
  | 'CREATED'
  | 'EXECUTED'
  | 'CANCELLED'
  | 'QUEUED'
  | 'VETOED'
  | 'VOTED';

export type ProposalLifecycleEvent_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  kind?: InputMaybe<ProposalLifecycleEventKind>;
  kind_not?: InputMaybe<ProposalLifecycleEventKind>;
  kind_in?: InputMaybe<Array<ProposalLifecycleEventKind>>;
  kind_not_in?: InputMaybe<Array<ProposalLifecycleEventKind>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Proposal_filter>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vote?: InputMaybe<Scalars['String']['input']>;
  vote_not?: InputMaybe<Scalars['String']['input']>;
  vote_gt?: InputMaybe<Scalars['String']['input']>;
  vote_lt?: InputMaybe<Scalars['String']['input']>;
  vote_gte?: InputMaybe<Scalars['String']['input']>;
  vote_lte?: InputMaybe<Scalars['String']['input']>;
  vote_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vote_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vote_contains?: InputMaybe<Scalars['String']['input']>;
  vote_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_not_contains?: InputMaybe<Scalars['String']['input']>;
  vote_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_starts_with?: InputMaybe<Scalars['String']['input']>;
  vote_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vote_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_ends_with?: InputMaybe<Scalars['String']['input']>;
  vote_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vote_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_?: InputMaybe<Vote_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalLifecycleEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalLifecycleEvent_filter>>>;
};

export type ProposalLifecycleEvent_orderBy =
  | 'id'
  | 'kind'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__createdTimestamp'
  | 'proposal__createdBlock'
  | 'proposal__createdTransactionHash'
  | 'proposal__startBlock'
  | 'proposal__endBlock'
  | 'proposal__proposalThreshold'
  | 'proposal__quorumVotes'
  | 'proposal__forVotes'
  | 'proposal__againstVotes'
  | 'proposal__abstainVotes'
  | 'proposal__title'
  | 'proposal__description'
  | 'proposal__status'
  | 'proposal__executionETA'
  | 'proposal__totalSupply'
  | 'proposal__minQuorumVotesBPS'
  | 'proposal__maxQuorumVotesBPS'
  | 'proposal__quorumCoefficient'
  | 'from'
  | 'txHash'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'vote'
  | 'vote__id'
  | 'vote__support'
  | 'vote__supportDetailed'
  | 'vote__votesRaw'
  | 'vote__votes'
  | 'vote__reason'
  | 'vote__blockNumber'
  | 'vote__blockTimestamp';

export type ProposalStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'CANCELLED'
  | 'VETOED'
  | 'QUEUED'
  | 'EXECUTED';

export type Proposal_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  proposer?: InputMaybe<Scalars['String']['input']>;
  proposer_not?: InputMaybe<Scalars['String']['input']>;
  proposer_gt?: InputMaybe<Scalars['String']['input']>;
  proposer_lt?: InputMaybe<Scalars['String']['input']>;
  proposer_gte?: InputMaybe<Scalars['String']['input']>;
  proposer_lte?: InputMaybe<Scalars['String']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposer_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposer_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposer_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposer_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposer_?: InputMaybe<Delegate_filter>;
  targets?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  values?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  signatures?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  calldatas?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlock?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTransactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdTransactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  startBlock?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forVotes?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  forVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  againstVotes?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  againstVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  againstVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  abstainVotes?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  abstainVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  abstainVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProposalStatus>;
  status_not?: InputMaybe<ProposalStatus>;
  status_in?: InputMaybe<Array<ProposalStatus>>;
  status_not_in?: InputMaybe<Array<ProposalStatus>>;
  executionETA?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_not?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executionETA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executionETA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes_?: InputMaybe<Vote_filter>;
  events_?: InputMaybe<ProposalLifecycleEvent_filter>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minQuorumVotesBPS?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_not?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']['input']>;
  minQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  minQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxQuorumVotesBPS?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_not?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']['input']>;
  maxQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  quorumCoefficient?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumCoefficient_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumCoefficient_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_filter>>>;
};

export type Proposal_orderBy =
  | 'id'
  | 'proposer'
  | 'proposer__id'
  | 'proposer__delegatedVotesRaw'
  | 'proposer__delegatedVotes'
  | 'proposer__tokenHoldersRepresentedAmount'
  | 'targets'
  | 'values'
  | 'signatures'
  | 'calldatas'
  | 'createdTimestamp'
  | 'createdBlock'
  | 'createdTransactionHash'
  | 'startBlock'
  | 'endBlock'
  | 'proposalThreshold'
  | 'quorumVotes'
  | 'forVotes'
  | 'againstVotes'
  | 'abstainVotes'
  | 'title'
  | 'description'
  | 'status'
  | 'executionETA'
  | 'votes'
  | 'events'
  | 'totalSupply'
  | 'minQuorumVotesBPS'
  | 'maxQuorumVotesBPS'
  | 'quorumCoefficient';

export type Query = {
  ogTransferEvent?: Maybe<OgTransferEvent>;
  ogTransferEvents: Array<OgTransferEvent>;
  ogGnar?: Maybe<OgGnar>;
  ogGnars: Array<OgGnar>;
  ogBid?: Maybe<OgBid>;
  ogBids: Array<OgBid>;
  ogAuction?: Maybe<OgAuction>;
  ogAuctions: Array<OgAuction>;
  delegationEvent?: Maybe<DelegationEvent>;
  delegationEvents: Array<DelegationEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  seed?: Maybe<Seed>;
  seeds: Array<Seed>;
  gnar?: Maybe<Gnar>;
  gnars: Array<Gnar>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  auctionHouse?: Maybe<AuctionHouse>;
  auctionHouses: Array<AuctionHouse>;
  gnarving?: Maybe<Gnarving>;
  gnarvings: Array<Gnarving>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalLifecycleEvent?: Maybe<ProposalLifecycleEvent>;
  proposalLifecycleEvents: Array<ProposalLifecycleEvent>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  governance?: Maybe<Governance>;
  governances: Array<Governance>;
  dynamicQuorumParams?: Maybe<DynamicQuorumParams>;
  dynamicQuorumParams_collection: Array<DynamicQuorumParams>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryogTransferEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgTransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgTransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogGnarArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogGnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgGnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgGnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogBidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogBidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegationEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegationEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryseedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryseedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Seed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Seed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Auction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Auction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionHouseArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionHousesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionHouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionHouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarvingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarvingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnarving_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnarving_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalLifecycleEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalLifecycleEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernanceArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydynamicQuorumParamsArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydynamicQuorumParams_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DynamicQuorumParams_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DynamicQuorumParams_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Seed = {
  /** The Gnar's ERC721 token id */
  id: Scalars['ID']['output'];
  /** The background index */
  background: Scalars['BigInt']['output'];
  /** The body index */
  body: Scalars['BigInt']['output'];
  /** The accessory index */
  accessory: Scalars['BigInt']['output'];
  /** The head index */
  head: Scalars['BigInt']['output'];
  /** The glasses index */
  glasses: Scalars['BigInt']['output'];
};

export type Seed_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  background?: InputMaybe<Scalars['BigInt']['input']>;
  background_not?: InputMaybe<Scalars['BigInt']['input']>;
  background_gt?: InputMaybe<Scalars['BigInt']['input']>;
  background_lt?: InputMaybe<Scalars['BigInt']['input']>;
  background_gte?: InputMaybe<Scalars['BigInt']['input']>;
  background_lte?: InputMaybe<Scalars['BigInt']['input']>;
  background_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  background_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  body?: InputMaybe<Scalars['BigInt']['input']>;
  body_not?: InputMaybe<Scalars['BigInt']['input']>;
  body_gt?: InputMaybe<Scalars['BigInt']['input']>;
  body_lt?: InputMaybe<Scalars['BigInt']['input']>;
  body_gte?: InputMaybe<Scalars['BigInt']['input']>;
  body_lte?: InputMaybe<Scalars['BigInt']['input']>;
  body_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  body_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  accessory?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_not?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_gt?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_lt?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_gte?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_lte?: InputMaybe<Scalars['BigInt']['input']>;
  accessory_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  accessory_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  head?: InputMaybe<Scalars['BigInt']['input']>;
  head_not?: InputMaybe<Scalars['BigInt']['input']>;
  head_gt?: InputMaybe<Scalars['BigInt']['input']>;
  head_lt?: InputMaybe<Scalars['BigInt']['input']>;
  head_gte?: InputMaybe<Scalars['BigInt']['input']>;
  head_lte?: InputMaybe<Scalars['BigInt']['input']>;
  head_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  head_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  glasses?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_not?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_gt?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_lt?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_gte?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_lte?: InputMaybe<Scalars['BigInt']['input']>;
  glasses_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  glasses_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Seed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Seed_filter>>>;
};

export type Seed_orderBy =
  | 'id'
  | 'background'
  | 'body'
  | 'accessory'
  | 'head'
  | 'glasses';

export type Subscription = {
  ogTransferEvent?: Maybe<OgTransferEvent>;
  ogTransferEvents: Array<OgTransferEvent>;
  ogGnar?: Maybe<OgGnar>;
  ogGnars: Array<OgGnar>;
  ogBid?: Maybe<OgBid>;
  ogBids: Array<OgBid>;
  ogAuction?: Maybe<OgAuction>;
  ogAuctions: Array<OgAuction>;
  delegationEvent?: Maybe<DelegationEvent>;
  delegationEvents: Array<DelegationEvent>;
  transferEvent?: Maybe<TransferEvent>;
  transferEvents: Array<TransferEvent>;
  seed?: Maybe<Seed>;
  seeds: Array<Seed>;
  gnar?: Maybe<Gnar>;
  gnars: Array<Gnar>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  auctionHouse?: Maybe<AuctionHouse>;
  auctionHouses: Array<AuctionHouse>;
  gnarving?: Maybe<Gnarving>;
  gnarvings: Array<Gnarving>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalLifecycleEvent?: Maybe<ProposalLifecycleEvent>;
  proposalLifecycleEvents: Array<ProposalLifecycleEvent>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  governance?: Maybe<Governance>;
  governances: Array<Governance>;
  dynamicQuorumParams?: Maybe<DynamicQuorumParams>;
  dynamicQuorumParams_collection: Array<DynamicQuorumParams>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionogTransferEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgTransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgTransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogGnarArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogGnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgGnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgGnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogBidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogBidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogAuctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OgAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegationEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DelegationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegationEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionseedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionseedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Seed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Seed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Auction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Auction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionHouseArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionHousesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionHouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionHouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarvingArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarvingsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnarving_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnarving_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalLifecycleEventArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalLifecycleEventsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernanceArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondynamicQuorumParamsArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondynamicQuorumParams_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DynamicQuorumParams_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DynamicQuorumParams_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TransferEvent = {
  /** The txn hash of this event */
  id: Scalars['ID']['output'];
  /** The Gnar being transfered */
  gnar: Gnar;
  /** Previous holder address */
  previousHolder: Account;
  /** New holder address */
  newHolder: Account;
  /** Block number of the event */
  blockNumber: Scalars['BigInt']['output'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt']['output'];
};

export type TransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  gnar?: InputMaybe<Scalars['String']['input']>;
  gnar_not?: InputMaybe<Scalars['String']['input']>;
  gnar_gt?: InputMaybe<Scalars['String']['input']>;
  gnar_lt?: InputMaybe<Scalars['String']['input']>;
  gnar_gte?: InputMaybe<Scalars['String']['input']>;
  gnar_lte?: InputMaybe<Scalars['String']['input']>;
  gnar_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  gnar_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains?: InputMaybe<Scalars['String']['input']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  gnar_?: InputMaybe<Gnar_filter>;
  previousHolder?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not?: InputMaybe<Scalars['String']['input']>;
  previousHolder_gt?: InputMaybe<Scalars['String']['input']>;
  previousHolder_lt?: InputMaybe<Scalars['String']['input']>;
  previousHolder_gte?: InputMaybe<Scalars['String']['input']>;
  previousHolder_lte?: InputMaybe<Scalars['String']['input']>;
  previousHolder_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousHolder_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousHolder_contains?: InputMaybe<Scalars['String']['input']>;
  previousHolder_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousHolder_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousHolder_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousHolder_?: InputMaybe<Account_filter>;
  newHolder?: InputMaybe<Scalars['String']['input']>;
  newHolder_not?: InputMaybe<Scalars['String']['input']>;
  newHolder_gt?: InputMaybe<Scalars['String']['input']>;
  newHolder_lt?: InputMaybe<Scalars['String']['input']>;
  newHolder_gte?: InputMaybe<Scalars['String']['input']>;
  newHolder_lte?: InputMaybe<Scalars['String']['input']>;
  newHolder_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newHolder_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  newHolder_contains?: InputMaybe<Scalars['String']['input']>;
  newHolder_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_contains?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_starts_with?: InputMaybe<Scalars['String']['input']>;
  newHolder_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_ends_with?: InputMaybe<Scalars['String']['input']>;
  newHolder_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newHolder_?: InputMaybe<Account_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TransferEvent_filter>>>;
};

export type TransferEvent_orderBy =
  | 'id'
  | 'gnar'
  | 'gnar__id'
  | 'gnar__creationTimestamp'
  | 'gnar__hdOwner'
  | 'previousHolder'
  | 'previousHolder__id'
  | 'previousHolder__tokenBalanceRaw'
  | 'previousHolder__tokenBalance'
  | 'previousHolder__totalTokensHeldRaw'
  | 'previousHolder__totalTokensHeld'
  | 'newHolder'
  | 'newHolder__id'
  | 'newHolder__tokenBalanceRaw'
  | 'newHolder__tokenBalance'
  | 'newHolder__totalTokensHeldRaw'
  | 'newHolder__totalTokensHeld'
  | 'blockNumber'
  | 'blockTimestamp';

export type Vote = {
  /** Delegate ID + Proposal ID */
  id: Scalars['ID']['output'];
  /** Whether the vote is in favour of the proposal */
  support: Scalars['Boolean']['output'];
  /** The integer support value: against (0), for (1), or abstain (2) */
  supportDetailed: Scalars['Int']['output'];
  /** Amount of votes in favour or against expressed in the smallest unit of the Gnars ERC721 Token */
  votesRaw: Scalars['BigInt']['output'];
  /** Amount of votes in favour or against expressed as a BigInt normalized value for the Gnars ERC721 Token */
  votes: Scalars['BigInt']['output'];
  /** The optional vote reason */
  reason?: Maybe<Scalars['String']['output']>;
  /** Delegate that emitted the vote */
  voter: Delegate;
  /** The Gnars used to vote */
  gnars?: Maybe<Array<Gnar>>;
  /** Proposal that is being voted on */
  proposal: Proposal;
  /** Block number of vote */
  blockNumber: Scalars['BigInt']['output'];
  /** The timestamp of the block the vote is in */
  blockTimestamp: Scalars['BigInt']['output'];
};


export type VotegnarsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};

export type Vote_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  support?: InputMaybe<Scalars['Boolean']['input']>;
  support_not?: InputMaybe<Scalars['Boolean']['input']>;
  support_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  support_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  supportDetailed?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_not?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_gt?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_lt?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_gte?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_lte?: InputMaybe<Scalars['Int']['input']>;
  supportDetailed_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  supportDetailed_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  votesRaw?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_not?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votesRaw_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes?: InputMaybe<Scalars['BigInt']['input']>;
  votes_not?: InputMaybe<Scalars['BigInt']['input']>;
  votes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reason_not?: InputMaybe<Scalars['String']['input']>;
  reason_gt?: InputMaybe<Scalars['String']['input']>;
  reason_lt?: InputMaybe<Scalars['String']['input']>;
  reason_gte?: InputMaybe<Scalars['String']['input']>;
  reason_lte?: InputMaybe<Scalars['String']['input']>;
  reason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
  voter_not?: InputMaybe<Scalars['String']['input']>;
  voter_gt?: InputMaybe<Scalars['String']['input']>;
  voter_lt?: InputMaybe<Scalars['String']['input']>;
  voter_gte?: InputMaybe<Scalars['String']['input']>;
  voter_lte?: InputMaybe<Scalars['String']['input']>;
  voter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_contains?: InputMaybe<Scalars['String']['input']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_starts_with?: InputMaybe<Scalars['String']['input']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_ends_with?: InputMaybe<Scalars['String']['input']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_?: InputMaybe<Delegate_filter>;
  gnars?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  gnars_?: InputMaybe<Gnar_filter>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Proposal_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vote_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Vote_filter>>>;
};

export type Vote_orderBy =
  | 'id'
  | 'support'
  | 'supportDetailed'
  | 'votesRaw'
  | 'votes'
  | 'reason'
  | 'voter'
  | 'voter__id'
  | 'voter__delegatedVotesRaw'
  | 'voter__delegatedVotes'
  | 'voter__tokenHoldersRepresentedAmount'
  | 'gnars'
  | 'proposal'
  | 'proposal__id'
  | 'proposal__createdTimestamp'
  | 'proposal__createdBlock'
  | 'proposal__createdTransactionHash'
  | 'proposal__startBlock'
  | 'proposal__endBlock'
  | 'proposal__proposalThreshold'
  | 'proposal__quorumVotes'
  | 'proposal__forVotes'
  | 'proposal__againstVotes'
  | 'proposal__abstainVotes'
  | 'proposal__title'
  | 'proposal__description'
  | 'proposal__status'
  | 'proposal__executionETA'
  | 'proposal__totalSupply'
  | 'proposal__minQuorumVotesBPS'
  | 'proposal__maxQuorumVotesBPS'
  | 'proposal__quorumCoefficient'
  | 'blockNumber'
  | 'blockTimestamp';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  ogTransferEvent: InContextSdkMethod<Query['ogTransferEvent'], QueryogTransferEventArgs, MeshContext>,
  /** null **/
  ogTransferEvents: InContextSdkMethod<Query['ogTransferEvents'], QueryogTransferEventsArgs, MeshContext>,
  /** null **/
  ogGnar: InContextSdkMethod<Query['ogGnar'], QueryogGnarArgs, MeshContext>,
  /** null **/
  ogGnars: InContextSdkMethod<Query['ogGnars'], QueryogGnarsArgs, MeshContext>,
  /** null **/
  ogBid: InContextSdkMethod<Query['ogBid'], QueryogBidArgs, MeshContext>,
  /** null **/
  ogBids: InContextSdkMethod<Query['ogBids'], QueryogBidsArgs, MeshContext>,
  /** null **/
  ogAuction: InContextSdkMethod<Query['ogAuction'], QueryogAuctionArgs, MeshContext>,
  /** null **/
  ogAuctions: InContextSdkMethod<Query['ogAuctions'], QueryogAuctionsArgs, MeshContext>,
  /** null **/
  delegationEvent: InContextSdkMethod<Query['delegationEvent'], QuerydelegationEventArgs, MeshContext>,
  /** null **/
  delegationEvents: InContextSdkMethod<Query['delegationEvents'], QuerydelegationEventsArgs, MeshContext>,
  /** null **/
  transferEvent: InContextSdkMethod<Query['transferEvent'], QuerytransferEventArgs, MeshContext>,
  /** null **/
  transferEvents: InContextSdkMethod<Query['transferEvents'], QuerytransferEventsArgs, MeshContext>,
  /** null **/
  seed: InContextSdkMethod<Query['seed'], QueryseedArgs, MeshContext>,
  /** null **/
  seeds: InContextSdkMethod<Query['seeds'], QueryseedsArgs, MeshContext>,
  /** null **/
  gnar: InContextSdkMethod<Query['gnar'], QuerygnarArgs, MeshContext>,
  /** null **/
  gnars: InContextSdkMethod<Query['gnars'], QuerygnarsArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Query['bid'], QuerybidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Query['bids'], QuerybidsArgs, MeshContext>,
  /** null **/
  auction: InContextSdkMethod<Query['auction'], QueryauctionArgs, MeshContext>,
  /** null **/
  auctions: InContextSdkMethod<Query['auctions'], QueryauctionsArgs, MeshContext>,
  /** null **/
  auctionHouse: InContextSdkMethod<Query['auctionHouse'], QueryauctionHouseArgs, MeshContext>,
  /** null **/
  auctionHouses: InContextSdkMethod<Query['auctionHouses'], QueryauctionHousesArgs, MeshContext>,
  /** null **/
  gnarving: InContextSdkMethod<Query['gnarving'], QuerygnarvingArgs, MeshContext>,
  /** null **/
  gnarvings: InContextSdkMethod<Query['gnarvings'], QuerygnarvingsArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Query['account'], QueryaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Query['accounts'], QueryaccountsArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Query['delegate'], QuerydelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Query['delegates'], QuerydelegatesArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Query['proposal'], QueryproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Query['proposals'], QueryproposalsArgs, MeshContext>,
  /** null **/
  proposalLifecycleEvent: InContextSdkMethod<Query['proposalLifecycleEvent'], QueryproposalLifecycleEventArgs, MeshContext>,
  /** null **/
  proposalLifecycleEvents: InContextSdkMethod<Query['proposalLifecycleEvents'], QueryproposalLifecycleEventsArgs, MeshContext>,
  /** null **/
  vote: InContextSdkMethod<Query['vote'], QueryvoteArgs, MeshContext>,
  /** null **/
  votes: InContextSdkMethod<Query['votes'], QueryvotesArgs, MeshContext>,
  /** null **/
  governance: InContextSdkMethod<Query['governance'], QuerygovernanceArgs, MeshContext>,
  /** null **/
  governances: InContextSdkMethod<Query['governances'], QuerygovernancesArgs, MeshContext>,
  /** null **/
  dynamicQuorumParams: InContextSdkMethod<Query['dynamicQuorumParams'], QuerydynamicQuorumParamsArgs, MeshContext>,
  /** null **/
  dynamicQuorumParams_collection: InContextSdkMethod<Query['dynamicQuorumParams_collection'], QuerydynamicQuorumParams_collectionArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  ogTransferEvent: InContextSdkMethod<Subscription['ogTransferEvent'], SubscriptionogTransferEventArgs, MeshContext>,
  /** null **/
  ogTransferEvents: InContextSdkMethod<Subscription['ogTransferEvents'], SubscriptionogTransferEventsArgs, MeshContext>,
  /** null **/
  ogGnar: InContextSdkMethod<Subscription['ogGnar'], SubscriptionogGnarArgs, MeshContext>,
  /** null **/
  ogGnars: InContextSdkMethod<Subscription['ogGnars'], SubscriptionogGnarsArgs, MeshContext>,
  /** null **/
  ogBid: InContextSdkMethod<Subscription['ogBid'], SubscriptionogBidArgs, MeshContext>,
  /** null **/
  ogBids: InContextSdkMethod<Subscription['ogBids'], SubscriptionogBidsArgs, MeshContext>,
  /** null **/
  ogAuction: InContextSdkMethod<Subscription['ogAuction'], SubscriptionogAuctionArgs, MeshContext>,
  /** null **/
  ogAuctions: InContextSdkMethod<Subscription['ogAuctions'], SubscriptionogAuctionsArgs, MeshContext>,
  /** null **/
  delegationEvent: InContextSdkMethod<Subscription['delegationEvent'], SubscriptiondelegationEventArgs, MeshContext>,
  /** null **/
  delegationEvents: InContextSdkMethod<Subscription['delegationEvents'], SubscriptiondelegationEventsArgs, MeshContext>,
  /** null **/
  transferEvent: InContextSdkMethod<Subscription['transferEvent'], SubscriptiontransferEventArgs, MeshContext>,
  /** null **/
  transferEvents: InContextSdkMethod<Subscription['transferEvents'], SubscriptiontransferEventsArgs, MeshContext>,
  /** null **/
  seed: InContextSdkMethod<Subscription['seed'], SubscriptionseedArgs, MeshContext>,
  /** null **/
  seeds: InContextSdkMethod<Subscription['seeds'], SubscriptionseedsArgs, MeshContext>,
  /** null **/
  gnar: InContextSdkMethod<Subscription['gnar'], SubscriptiongnarArgs, MeshContext>,
  /** null **/
  gnars: InContextSdkMethod<Subscription['gnars'], SubscriptiongnarsArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Subscription['bid'], SubscriptionbidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Subscription['bids'], SubscriptionbidsArgs, MeshContext>,
  /** null **/
  auction: InContextSdkMethod<Subscription['auction'], SubscriptionauctionArgs, MeshContext>,
  /** null **/
  auctions: InContextSdkMethod<Subscription['auctions'], SubscriptionauctionsArgs, MeshContext>,
  /** null **/
  auctionHouse: InContextSdkMethod<Subscription['auctionHouse'], SubscriptionauctionHouseArgs, MeshContext>,
  /** null **/
  auctionHouses: InContextSdkMethod<Subscription['auctionHouses'], SubscriptionauctionHousesArgs, MeshContext>,
  /** null **/
  gnarving: InContextSdkMethod<Subscription['gnarving'], SubscriptiongnarvingArgs, MeshContext>,
  /** null **/
  gnarvings: InContextSdkMethod<Subscription['gnarvings'], SubscriptiongnarvingsArgs, MeshContext>,
  /** null **/
  account: InContextSdkMethod<Subscription['account'], SubscriptionaccountArgs, MeshContext>,
  /** null **/
  accounts: InContextSdkMethod<Subscription['accounts'], SubscriptionaccountsArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Subscription['delegate'], SubscriptiondelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Subscription['delegates'], SubscriptiondelegatesArgs, MeshContext>,
  /** null **/
  proposal: InContextSdkMethod<Subscription['proposal'], SubscriptionproposalArgs, MeshContext>,
  /** null **/
  proposals: InContextSdkMethod<Subscription['proposals'], SubscriptionproposalsArgs, MeshContext>,
  /** null **/
  proposalLifecycleEvent: InContextSdkMethod<Subscription['proposalLifecycleEvent'], SubscriptionproposalLifecycleEventArgs, MeshContext>,
  /** null **/
  proposalLifecycleEvents: InContextSdkMethod<Subscription['proposalLifecycleEvents'], SubscriptionproposalLifecycleEventsArgs, MeshContext>,
  /** null **/
  vote: InContextSdkMethod<Subscription['vote'], SubscriptionvoteArgs, MeshContext>,
  /** null **/
  votes: InContextSdkMethod<Subscription['votes'], SubscriptionvotesArgs, MeshContext>,
  /** null **/
  governance: InContextSdkMethod<Subscription['governance'], SubscriptiongovernanceArgs, MeshContext>,
  /** null **/
  governances: InContextSdkMethod<Subscription['governances'], SubscriptiongovernancesArgs, MeshContext>,
  /** null **/
  dynamicQuorumParams: InContextSdkMethod<Subscription['dynamicQuorumParams'], SubscriptiondynamicQuorumParamsArgs, MeshContext>,
  /** null **/
  dynamicQuorumParams_collection: InContextSdkMethod<Subscription['dynamicQuorumParams_collection'], SubscriptiondynamicQuorumParams_collectionArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["gnars"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
