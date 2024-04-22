// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GnarsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type Account = {
  /** An Account is any address that holds any amount of Gnars, the id used is the blockchain address. */
  id: Scalars['ID'];
  /** Delegate address of the token holder which will participate in votings. Delegates don't need to hold any tokens and can even be the token holder itself. */
  delegate?: Maybe<Delegate>;
  /** Gnar balance of this address expressed in the smallest unit of the Gnars ERC721 Token */
  tokenBalanceRaw: Scalars['BigInt'];
  /** Gnar balance of this address expressed as a BigInt normalized value for the Gnars ERC721 Token */
  tokenBalance: Scalars['BigInt'];
  /** Total amount of Gnars ever held by this address expressed in the smallest unit of the Gnars ERC721 Token */
  totalTokensHeldRaw: Scalars['BigInt'];
  /** Total amount of Gnars ever held by this address expressed as a BigInt normalized value for the Gnars ERC721 Token */
  totalTokensHeld: Scalars['BigInt'];
  /** The Gnars owned by this account */
  gnars: Array<Gnar>;
};


export type AccountgnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};

export type Account_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Delegate_filter>;
  tokenBalanceRaw?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_not?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_gt?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_lt?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_gte?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_lte?: InputMaybe<Scalars['BigInt']>;
  tokenBalanceRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalance?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_not?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_gt?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_lt?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_gte?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_lte?: InputMaybe<Scalars['BigInt']>;
  tokenBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeldRaw?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_not?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeldRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeldRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeld?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_not?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokensHeld_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokensHeld_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gnars?: InputMaybe<Array<Scalars['String']>>;
  gnars_not?: InputMaybe<Array<Scalars['String']>>;
  gnars_contains?: InputMaybe<Array<Scalars['String']>>;
  gnars_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gnars_not_contains?: InputMaybe<Array<Scalars['String']>>;
  gnars_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
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

export type Auction = {
  /** The Gnar's ERC721 token id */
  id: Scalars['ID'];
  /** The Gnar */
  gnar: Gnar;
  /** The current highest bid amount */
  amount: Scalars['BigInt'];
  /** The time that the auction started */
  startTime: Scalars['BigInt'];
  /** The time that the auction is scheduled to end */
  endTime: Scalars['BigInt'];
  /** The account with the current highest bid */
  bidder?: Maybe<Account>;
  /** Whether or not the auction has been settled */
  settled: Scalars['Boolean'];
  /** The auction bids */
  bids: Array<Bid>;
};


export type AuctionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};

export type AuctionHouse = {
  /** Unique entity used to keep track of AuctionHouse settings */
  id: Scalars['ID'];
  /** The minimum value for bids */
  reservePrice: Scalars['BigInt'];
  /** The minimum time left on an Auction after a new bid is placed */
  timeBuffer: Scalars['BigInt'];
};

export type AuctionHouse_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  reservePrice?: InputMaybe<Scalars['BigInt']>;
  reservePrice_not?: InputMaybe<Scalars['BigInt']>;
  reservePrice_gt?: InputMaybe<Scalars['BigInt']>;
  reservePrice_lt?: InputMaybe<Scalars['BigInt']>;
  reservePrice_gte?: InputMaybe<Scalars['BigInt']>;
  reservePrice_lte?: InputMaybe<Scalars['BigInt']>;
  reservePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reservePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeBuffer?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_not?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_gt?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_lt?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_gte?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_lte?: InputMaybe<Scalars['BigInt']>;
  timeBuffer_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timeBuffer_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<Gnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime?: InputMaybe<Scalars['BigInt']>;
  startTime_not?: InputMaybe<Scalars['BigInt']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']>;
  startTime_lt?: InputMaybe<Scalars['BigInt']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['String']>;
  bidder_not?: InputMaybe<Scalars['String']>;
  bidder_gt?: InputMaybe<Scalars['String']>;
  bidder_lt?: InputMaybe<Scalars['String']>;
  bidder_gte?: InputMaybe<Scalars['String']>;
  bidder_lte?: InputMaybe<Scalars['String']>;
  bidder_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_contains?: InputMaybe<Scalars['String']>;
  bidder_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_contains?: InputMaybe<Scalars['String']>;
  bidder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_starts_with?: InputMaybe<Scalars['String']>;
  bidder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_ends_with?: InputMaybe<Scalars['String']>;
  bidder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_?: InputMaybe<Account_filter>;
  settled?: InputMaybe<Scalars['Boolean']>;
  settled_not?: InputMaybe<Scalars['Boolean']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  id: Scalars['ID'];
  /** The Gnar being bid on */
  gnar: Gnar;
  /** Bid amount */
  amount: Scalars['BigInt'];
  /** Bidder account */
  bidder?: Maybe<Account>;
  /** Block number of the bid */
  blockNumber: Scalars['BigInt'];
  /** Index of transaction within block */
  txIndex: Scalars['BigInt'];
  /** The auction being bid in */
  auction: Auction;
  /** The timestamp of the block the bid is in */
  blockTimestamp: Scalars['BigInt'];
};

export type Bid_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<Gnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['String']>;
  bidder_not?: InputMaybe<Scalars['String']>;
  bidder_gt?: InputMaybe<Scalars['String']>;
  bidder_lt?: InputMaybe<Scalars['String']>;
  bidder_gte?: InputMaybe<Scalars['String']>;
  bidder_lte?: InputMaybe<Scalars['String']>;
  bidder_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_contains?: InputMaybe<Scalars['String']>;
  bidder_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_contains?: InputMaybe<Scalars['String']>;
  bidder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_starts_with?: InputMaybe<Scalars['String']>;
  bidder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_ends_with?: InputMaybe<Scalars['String']>;
  bidder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_?: InputMaybe<Account_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txIndex?: InputMaybe<Scalars['BigInt']>;
  txIndex_not?: InputMaybe<Scalars['BigInt']>;
  txIndex_gt?: InputMaybe<Scalars['BigInt']>;
  txIndex_lt?: InputMaybe<Scalars['BigInt']>;
  txIndex_gte?: InputMaybe<Scalars['BigInt']>;
  txIndex_lte?: InputMaybe<Scalars['BigInt']>;
  txIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auction?: InputMaybe<Scalars['String']>;
  auction_not?: InputMaybe<Scalars['String']>;
  auction_gt?: InputMaybe<Scalars['String']>;
  auction_lt?: InputMaybe<Scalars['String']>;
  auction_gte?: InputMaybe<Scalars['String']>;
  auction_lte?: InputMaybe<Scalars['String']>;
  auction_in?: InputMaybe<Array<Scalars['String']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']>>;
  auction_contains?: InputMaybe<Scalars['String']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_not_contains?: InputMaybe<Scalars['String']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_starts_with?: InputMaybe<Scalars['String']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_ends_with?: InputMaybe<Scalars['String']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  auction_?: InputMaybe<Auction_filter>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Delegate = {
  /** A Delegate is any address that has been delegated with voting tokens by a token holder, id is the blockchain address of said delegate */
  id: Scalars['ID'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed in the smallest unit of the Gnars ERC721 Token */
  delegatedVotesRaw: Scalars['BigInt'];
  /** Amount of votes delegated to this delegate to be used on proposal votings expressed as a BigInt normalized value for the Gnars ERC721 Token */
  delegatedVotes: Scalars['BigInt'];
  tokenHoldersRepresentedAmount: Scalars['Int'];
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
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
};


export type DelegategnarsRepresentedArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};


export type DelegatevotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};


export type DelegateproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
};

export type Delegate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenHoldersRepresentedAmount?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_not?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_gt?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_lt?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_gte?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_lte?: InputMaybe<Scalars['Int']>;
  tokenHoldersRepresentedAmount_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenHoldersRepresentedAmount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenHoldersRepresented_?: InputMaybe<Account_filter>;
  gnarsRepresented?: InputMaybe<Array<Scalars['String']>>;
  gnarsRepresented_not?: InputMaybe<Array<Scalars['String']>>;
  gnarsRepresented_contains?: InputMaybe<Array<Scalars['String']>>;
  gnarsRepresented_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gnarsRepresented_not_contains?: InputMaybe<Array<Scalars['String']>>;
  gnarsRepresented_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
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
  id: Scalars['ID'];
  /** The Gnar being delegated */
  gnar: Gnar;
  /** Previous delegate address */
  previousDelegate: Delegate;
  /** New delegate address */
  newDelegate: Delegate;
  /** Block number of the event */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt'];
};

export type DelegationEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<Gnar_filter>;
  previousDelegate?: InputMaybe<Scalars['String']>;
  previousDelegate_not?: InputMaybe<Scalars['String']>;
  previousDelegate_gt?: InputMaybe<Scalars['String']>;
  previousDelegate_lt?: InputMaybe<Scalars['String']>;
  previousDelegate_gte?: InputMaybe<Scalars['String']>;
  previousDelegate_lte?: InputMaybe<Scalars['String']>;
  previousDelegate_in?: InputMaybe<Array<Scalars['String']>>;
  previousDelegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  previousDelegate_contains?: InputMaybe<Scalars['String']>;
  previousDelegate_contains_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_contains?: InputMaybe<Scalars['String']>;
  previousDelegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_starts_with?: InputMaybe<Scalars['String']>;
  previousDelegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_starts_with?: InputMaybe<Scalars['String']>;
  previousDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_ends_with?: InputMaybe<Scalars['String']>;
  previousDelegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_not_ends_with?: InputMaybe<Scalars['String']>;
  previousDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousDelegate_?: InputMaybe<Delegate_filter>;
  newDelegate?: InputMaybe<Scalars['String']>;
  newDelegate_not?: InputMaybe<Scalars['String']>;
  newDelegate_gt?: InputMaybe<Scalars['String']>;
  newDelegate_lt?: InputMaybe<Scalars['String']>;
  newDelegate_gte?: InputMaybe<Scalars['String']>;
  newDelegate_lte?: InputMaybe<Scalars['String']>;
  newDelegate_in?: InputMaybe<Array<Scalars['String']>>;
  newDelegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  newDelegate_contains?: InputMaybe<Scalars['String']>;
  newDelegate_contains_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_contains?: InputMaybe<Scalars['String']>;
  newDelegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_starts_with?: InputMaybe<Scalars['String']>;
  newDelegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_starts_with?: InputMaybe<Scalars['String']>;
  newDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_ends_with?: InputMaybe<Scalars['String']>;
  newDelegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_ends_with?: InputMaybe<Scalars['String']>;
  newDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_?: InputMaybe<Delegate_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** Min quorum basis points */
  minQuorumVotesBPS: Scalars['Int'];
  /** Max quorum basis points */
  maxQuorumVotesBPS: Scalars['Int'];
  /** The dynamic quorum coefficient */
  quorumCoefficient: Scalars['BigInt'];
  /** The block from which proposals are using DQ, based on when we first see configuration being set */
  dynamicQuorumStartBlock?: Maybe<Scalars['BigInt']>;
};

export type DynamicQuorumParams_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  minQuorumVotesBPS?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_not?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']>>;
  minQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']>>;
  maxQuorumVotesBPS?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_not?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']>>;
  maxQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']>>;
  quorumCoefficient?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_not?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_gt?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_lt?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_gte?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_lte?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumCoefficient_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dynamicQuorumStartBlock?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_not?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_gt?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_lt?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_gte?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_lte?: InputMaybe<Scalars['BigInt']>;
  dynamicQuorumStartBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dynamicQuorumStartBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** The Gnar's creation timestamp */
  creationTimestamp: Scalars['BigInt'];
  /** The seed used to determine the Gnar's traits */
  seed?: Maybe<Seed>;
  /** The owner of the Gnar */
  owner: Account;
  /** The address of the HD Gnar counterpart last claimer */
  hdOwner: Scalars['Bytes'];
  /** Historical votes for the Gnar */
  votes: Array<Vote>;
  /** The Gnar's auction */
  auction?: Maybe<Auction>;
};


export type GnarvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};

export type Gnar_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  seed?: InputMaybe<Scalars['String']>;
  seed_not?: InputMaybe<Scalars['String']>;
  seed_gt?: InputMaybe<Scalars['String']>;
  seed_lt?: InputMaybe<Scalars['String']>;
  seed_gte?: InputMaybe<Scalars['String']>;
  seed_lte?: InputMaybe<Scalars['String']>;
  seed_in?: InputMaybe<Array<Scalars['String']>>;
  seed_not_in?: InputMaybe<Array<Scalars['String']>>;
  seed_contains?: InputMaybe<Scalars['String']>;
  seed_contains_nocase?: InputMaybe<Scalars['String']>;
  seed_not_contains?: InputMaybe<Scalars['String']>;
  seed_not_contains_nocase?: InputMaybe<Scalars['String']>;
  seed_starts_with?: InputMaybe<Scalars['String']>;
  seed_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seed_not_starts_with?: InputMaybe<Scalars['String']>;
  seed_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seed_ends_with?: InputMaybe<Scalars['String']>;
  seed_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seed_not_ends_with?: InputMaybe<Scalars['String']>;
  seed_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seed_?: InputMaybe<Seed_filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_filter>;
  hdOwner?: InputMaybe<Scalars['Bytes']>;
  hdOwner_not?: InputMaybe<Scalars['Bytes']>;
  hdOwner_gt?: InputMaybe<Scalars['Bytes']>;
  hdOwner_lt?: InputMaybe<Scalars['Bytes']>;
  hdOwner_gte?: InputMaybe<Scalars['Bytes']>;
  hdOwner_lte?: InputMaybe<Scalars['Bytes']>;
  hdOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hdOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hdOwner_contains?: InputMaybe<Scalars['Bytes']>;
  hdOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  votes_?: InputMaybe<Vote_filter>;
  auction?: InputMaybe<Scalars['String']>;
  auction_not?: InputMaybe<Scalars['String']>;
  auction_gt?: InputMaybe<Scalars['String']>;
  auction_lt?: InputMaybe<Scalars['String']>;
  auction_gte?: InputMaybe<Scalars['String']>;
  auction_lte?: InputMaybe<Scalars['String']>;
  auction_in?: InputMaybe<Array<Scalars['String']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']>>;
  auction_contains?: InputMaybe<Scalars['String']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_not_contains?: InputMaybe<Scalars['String']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_starts_with?: InputMaybe<Scalars['String']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_ends_with?: InputMaybe<Scalars['String']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  id: Scalars['ID'];
  /** Amount of Gnarvings that have happened */
  gnarvings: Scalars['BigInt'];
  /** Amount of auctions that separate Gnarvings */
  auctionsBetweenGnarvings: Scalars['BigInt'];
  /** Amount of auctions left until next gnarving */
  auctionsUntilNextGnarving: Scalars['BigInt'];
  /** Auction duration at launch */
  initialAuctionDuration: Scalars['BigInt'];
  /** Current auction duration */
  auctionDuration: Scalars['BigInt'];
};

export type Gnarving_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnarvings?: InputMaybe<Scalars['BigInt']>;
  gnarvings_not?: InputMaybe<Scalars['BigInt']>;
  gnarvings_gt?: InputMaybe<Scalars['BigInt']>;
  gnarvings_lt?: InputMaybe<Scalars['BigInt']>;
  gnarvings_gte?: InputMaybe<Scalars['BigInt']>;
  gnarvings_lte?: InputMaybe<Scalars['BigInt']>;
  gnarvings_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gnarvings_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionsBetweenGnarvings?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_not?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_gt?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_lt?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_gte?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_lte?: InputMaybe<Scalars['BigInt']>;
  auctionsBetweenGnarvings_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionsBetweenGnarvings_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionsUntilNextGnarving?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_not?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_gt?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_lt?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_gte?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_lte?: InputMaybe<Scalars['BigInt']>;
  auctionsUntilNextGnarving_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionsUntilNextGnarving_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialAuctionDuration?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_not?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_gt?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_lt?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_gte?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_lte?: InputMaybe<Scalars['BigInt']>;
  initialAuctionDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  initialAuctionDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionDuration?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_not?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_gt?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_lt?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_gte?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_lte?: InputMaybe<Scalars['BigInt']>;
  auctionDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auctionDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** Number of proposals created */
  proposals: Scalars['BigInt'];
  /** Total number of token holders currently */
  currentTokenHolders: Scalars['BigInt'];
  /** Total number of delegates participating on the governance currently */
  currentDelegates: Scalars['BigInt'];
  /** Total number of token holders */
  totalTokenHolders: Scalars['BigInt'];
  /** Total number of delegates that held delegated votes */
  totalDelegates: Scalars['BigInt'];
  /** Total number of votes delegated expressed in the smallest unit of the Gnars ERC721 Token */
  delegatedVotesRaw: Scalars['BigInt'];
  /** Total number of votes delegated expressed as a BigInt normalized value for the Gnars ERC721 Token */
  delegatedVotes: Scalars['BigInt'];
  /** Number of proposals currently queued for execution */
  proposalsQueued: Scalars['BigInt'];
};

export type Governance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  proposals?: InputMaybe<Scalars['BigInt']>;
  proposals_not?: InputMaybe<Scalars['BigInt']>;
  proposals_gt?: InputMaybe<Scalars['BigInt']>;
  proposals_lt?: InputMaybe<Scalars['BigInt']>;
  proposals_gte?: InputMaybe<Scalars['BigInt']>;
  proposals_lte?: InputMaybe<Scalars['BigInt']>;
  proposals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTokenHolders?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_not?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_gt?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_lt?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_gte?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_lte?: InputMaybe<Scalars['BigInt']>;
  currentTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentDelegates?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_not?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_gt?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_lt?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_gte?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_lte?: InputMaybe<Scalars['BigInt']>;
  currentDelegates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokenHolders?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_not?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_gt?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_lt?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_gte?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_lte?: InputMaybe<Scalars['BigInt']>;
  totalTokenHolders_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTokenHolders_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegates?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_not?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_gt?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_lt?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_gte?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_lte?: InputMaybe<Scalars['BigInt']>;
  totalDelegates_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalDelegates_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_not?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_gt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_lt?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_gte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_lte?: InputMaybe<Scalars['BigInt']>;
  delegatedVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegatedVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsQueued?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_not?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_gt?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_lt?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_gte?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_lte?: InputMaybe<Scalars['BigInt']>;
  proposalsQueued_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalsQueued_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** The Gnar */
  gnar: OgGnar;
  /** The current highest bid amount */
  amount: Scalars['BigInt'];
  /** The block number at which the auction started */
  startBlock: Scalars['BigInt'];
  /** The block number at which the auction ends */
  endBlock: Scalars['BigInt'];
  /** The wallet with the current highest bid */
  bidder: Scalars['Bytes'];
  /** Whether or not the auction has been settled */
  settled: Scalars['Boolean'];
  /** The auction bids */
  bids: Array<OgBid>;
};


export type OgAuctionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
};

export type OgAuction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock?: InputMaybe<Scalars['BigInt']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['Bytes']>;
  bidder_not?: InputMaybe<Scalars['Bytes']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  settled?: InputMaybe<Scalars['Boolean']>;
  settled_not?: InputMaybe<Scalars['Boolean']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  id: Scalars['ID'];
  /** The OG Gnar being bid on */
  gnar: OgGnar;
  /** Bid amount */
  amount: Scalars['BigInt'];
  /** Bidder bytes */
  bidder: Scalars['Bytes'];
  /** Block number of the bid */
  blockNumber: Scalars['BigInt'];
  /** Index of transaction within block */
  txIndex: Scalars['BigInt'];
  /** The auction being bid in */
  auction: OgAuction;
  /** The timestamp of the block the bid is in */
  blockTimestamp: Scalars['BigInt'];
};

export type OgBid_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['Bytes']>;
  bidder_not?: InputMaybe<Scalars['Bytes']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txIndex?: InputMaybe<Scalars['BigInt']>;
  txIndex_not?: InputMaybe<Scalars['BigInt']>;
  txIndex_gt?: InputMaybe<Scalars['BigInt']>;
  txIndex_lt?: InputMaybe<Scalars['BigInt']>;
  txIndex_gte?: InputMaybe<Scalars['BigInt']>;
  txIndex_lte?: InputMaybe<Scalars['BigInt']>;
  txIndex_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auction?: InputMaybe<Scalars['String']>;
  auction_not?: InputMaybe<Scalars['String']>;
  auction_gt?: InputMaybe<Scalars['String']>;
  auction_lt?: InputMaybe<Scalars['String']>;
  auction_gte?: InputMaybe<Scalars['String']>;
  auction_lte?: InputMaybe<Scalars['String']>;
  auction_in?: InputMaybe<Array<Scalars['String']>>;
  auction_not_in?: InputMaybe<Array<Scalars['String']>>;
  auction_contains?: InputMaybe<Scalars['String']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_not_contains?: InputMaybe<Scalars['String']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  auction_starts_with?: InputMaybe<Scalars['String']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_starts_with?: InputMaybe<Scalars['String']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  auction_ends_with?: InputMaybe<Scalars['String']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  auction_?: InputMaybe<OgAuction_filter>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** The background index */
  background: Scalars['BigInt'];
  /** The body index */
  body: Scalars['BigInt'];
  /** The accessory index */
  accessory: Scalars['BigInt'];
  /** The head index */
  head: Scalars['BigInt'];
  /** The glasses index */
  glasses: Scalars['BigInt'];
  /** The owner of the OG Gnar */
  owner: Scalars['Bytes'];
  /** Was OG Gnar used to claim the 2 Gnars it's entitled to */
  wasClaimed: Scalars['Boolean'];
};

export type OgGnar_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  background?: InputMaybe<Scalars['BigInt']>;
  background_not?: InputMaybe<Scalars['BigInt']>;
  background_gt?: InputMaybe<Scalars['BigInt']>;
  background_lt?: InputMaybe<Scalars['BigInt']>;
  background_gte?: InputMaybe<Scalars['BigInt']>;
  background_lte?: InputMaybe<Scalars['BigInt']>;
  background_in?: InputMaybe<Array<Scalars['BigInt']>>;
  background_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  body?: InputMaybe<Scalars['BigInt']>;
  body_not?: InputMaybe<Scalars['BigInt']>;
  body_gt?: InputMaybe<Scalars['BigInt']>;
  body_lt?: InputMaybe<Scalars['BigInt']>;
  body_gte?: InputMaybe<Scalars['BigInt']>;
  body_lte?: InputMaybe<Scalars['BigInt']>;
  body_in?: InputMaybe<Array<Scalars['BigInt']>>;
  body_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accessory?: InputMaybe<Scalars['BigInt']>;
  accessory_not?: InputMaybe<Scalars['BigInt']>;
  accessory_gt?: InputMaybe<Scalars['BigInt']>;
  accessory_lt?: InputMaybe<Scalars['BigInt']>;
  accessory_gte?: InputMaybe<Scalars['BigInt']>;
  accessory_lte?: InputMaybe<Scalars['BigInt']>;
  accessory_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accessory_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  head?: InputMaybe<Scalars['BigInt']>;
  head_not?: InputMaybe<Scalars['BigInt']>;
  head_gt?: InputMaybe<Scalars['BigInt']>;
  head_lt?: InputMaybe<Scalars['BigInt']>;
  head_gte?: InputMaybe<Scalars['BigInt']>;
  head_lte?: InputMaybe<Scalars['BigInt']>;
  head_in?: InputMaybe<Array<Scalars['BigInt']>>;
  head_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  glasses?: InputMaybe<Scalars['BigInt']>;
  glasses_not?: InputMaybe<Scalars['BigInt']>;
  glasses_gt?: InputMaybe<Scalars['BigInt']>;
  glasses_lt?: InputMaybe<Scalars['BigInt']>;
  glasses_gte?: InputMaybe<Scalars['BigInt']>;
  glasses_lte?: InputMaybe<Scalars['BigInt']>;
  glasses_in?: InputMaybe<Array<Scalars['BigInt']>>;
  glasses_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  wasClaimed?: InputMaybe<Scalars['Boolean']>;
  wasClaimed_not?: InputMaybe<Scalars['Boolean']>;
  wasClaimed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  wasClaimed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  id: Scalars['ID'];
  /** The OG Gnar being transfered */
  gnar: OgGnar;
  /** Previous holder address */
  previousHolder: Scalars['Bytes'];
  /** New holder address */
  newHolder: Scalars['Bytes'];
  /** Block number of the event */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt'];
};

export type OgTransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<OgGnar_filter>;
  previousHolder?: InputMaybe<Scalars['Bytes']>;
  previousHolder_not?: InputMaybe<Scalars['Bytes']>;
  previousHolder_gt?: InputMaybe<Scalars['Bytes']>;
  previousHolder_lt?: InputMaybe<Scalars['Bytes']>;
  previousHolder_gte?: InputMaybe<Scalars['Bytes']>;
  previousHolder_lte?: InputMaybe<Scalars['Bytes']>;
  previousHolder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousHolder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousHolder_contains?: InputMaybe<Scalars['Bytes']>;
  previousHolder_not_contains?: InputMaybe<Scalars['Bytes']>;
  newHolder?: InputMaybe<Scalars['Bytes']>;
  newHolder_not?: InputMaybe<Scalars['Bytes']>;
  newHolder_gt?: InputMaybe<Scalars['Bytes']>;
  newHolder_lt?: InputMaybe<Scalars['Bytes']>;
  newHolder_gte?: InputMaybe<Scalars['Bytes']>;
  newHolder_lte?: InputMaybe<Scalars['Bytes']>;
  newHolder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newHolder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newHolder_contains?: InputMaybe<Scalars['Bytes']>;
  newHolder_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** Delegate that proposed the change */
  proposer: Delegate;
  /** Targets data for the change */
  targets?: Maybe<Array<Scalars['Bytes']>>;
  /** Values data for the change */
  values?: Maybe<Array<Scalars['BigInt']>>;
  /** Signature data for the change */
  signatures?: Maybe<Array<Scalars['String']>>;
  /** Call data for the change */
  calldatas?: Maybe<Array<Scalars['Bytes']>>;
  /** The proposal creation timestamp */
  createdTimestamp: Scalars['BigInt'];
  /** The proposal creation block */
  createdBlock: Scalars['BigInt'];
  /** The proposal creation transaction hash */
  createdTransactionHash: Scalars['Bytes'];
  /** Block number from where the voting starts */
  startBlock: Scalars['BigInt'];
  /** Block number from where the voting ends */
  endBlock: Scalars['BigInt'];
  /** The proposal threshold at the time of proposal creation */
  proposalThreshold: Scalars['BigInt'];
  /** The required number of votes for quorum at the time of proposal creation */
  quorumVotes: Scalars['BigInt'];
  /** The number of votes in favor of the proposal */
  forVotes: Scalars['BigInt'];
  /** The number of votes against of the proposal */
  againstVotes: Scalars['BigInt'];
  /** The number of votes to abstain on the proposal */
  abstainVotes: Scalars['BigInt'];
  /** The proposal title, parsed from the description */
  title: Scalars['String'];
  /** The full proposal description, which includes the title */
  description: Scalars['String'];
  /** Status of the proposal */
  status: ProposalStatus;
  /** Once the proposal is queued for execution it will have an ETA of the execution */
  executionETA?: Maybe<Scalars['BigInt']>;
  /** Votes associated to this proposal */
  votes: Array<Vote>;
  /** Lifecycle events associated to this proposal */
  events: Array<ProposalLifecycleEvent>;
  /** Total supply when this proposal was created */
  totalSupply: Scalars['BigInt'];
  /** Dynamic quorum param snapshot: min quorum basis points */
  minQuorumVotesBPS: Scalars['Int'];
  /** Dynamic quorum param snapshot: max quorum basis points */
  maxQuorumVotesBPS: Scalars['Int'];
  /** Dynamic quorum param snapshot: the dynamic quorum coefficient */
  quorumCoefficient: Scalars['BigInt'];
};


export type ProposalvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};


export type ProposaleventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
};

export type ProposalLifecycleEvent = {
  /** Proposal ID + EventKind */
  id: Scalars['ID'];
  kind: ProposalLifecycleEventKind;
  /** Proposal this event belongs to */
  proposal: Proposal;
  /** Account that initiaded the event */
  from: Scalars['Bytes'];
  /** The event transaction hash */
  txHash: Scalars['Bytes'];
  /** Block number of event */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of event */
  blockTimestamp: Scalars['BigInt'];
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  kind?: InputMaybe<ProposalLifecycleEventKind>;
  kind_not?: InputMaybe<ProposalLifecycleEventKind>;
  kind_in?: InputMaybe<Array<ProposalLifecycleEventKind>>;
  kind_not_in?: InputMaybe<Array<ProposalLifecycleEventKind>>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_filter>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vote?: InputMaybe<Scalars['String']>;
  vote_not?: InputMaybe<Scalars['String']>;
  vote_gt?: InputMaybe<Scalars['String']>;
  vote_lt?: InputMaybe<Scalars['String']>;
  vote_gte?: InputMaybe<Scalars['String']>;
  vote_lte?: InputMaybe<Scalars['String']>;
  vote_in?: InputMaybe<Array<Scalars['String']>>;
  vote_not_in?: InputMaybe<Array<Scalars['String']>>;
  vote_contains?: InputMaybe<Scalars['String']>;
  vote_contains_nocase?: InputMaybe<Scalars['String']>;
  vote_not_contains?: InputMaybe<Scalars['String']>;
  vote_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vote_starts_with?: InputMaybe<Scalars['String']>;
  vote_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vote_not_starts_with?: InputMaybe<Scalars['String']>;
  vote_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vote_ends_with?: InputMaybe<Scalars['String']>;
  vote_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vote_not_ends_with?: InputMaybe<Scalars['String']>;
  vote_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  proposer?: InputMaybe<Scalars['String']>;
  proposer_not?: InputMaybe<Scalars['String']>;
  proposer_gt?: InputMaybe<Scalars['String']>;
  proposer_lt?: InputMaybe<Scalars['String']>;
  proposer_gte?: InputMaybe<Scalars['String']>;
  proposer_lte?: InputMaybe<Scalars['String']>;
  proposer_in?: InputMaybe<Array<Scalars['String']>>;
  proposer_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposer_contains?: InputMaybe<Scalars['String']>;
  proposer_contains_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_contains?: InputMaybe<Scalars['String']>;
  proposer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposer_starts_with?: InputMaybe<Scalars['String']>;
  proposer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_starts_with?: InputMaybe<Scalars['String']>;
  proposer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_ends_with?: InputMaybe<Scalars['String']>;
  proposer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_not_ends_with?: InputMaybe<Scalars['String']>;
  proposer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposer_?: InputMaybe<Delegate_filter>;
  targets?: InputMaybe<Array<Scalars['Bytes']>>;
  targets_not?: InputMaybe<Array<Scalars['Bytes']>>;
  targets_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  values?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  signatures?: InputMaybe<Array<Scalars['String']>>;
  signatures_not?: InputMaybe<Array<Scalars['String']>>;
  signatures_contains?: InputMaybe<Array<Scalars['String']>>;
  signatures_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  signatures_not_contains?: InputMaybe<Array<Scalars['String']>>;
  signatures_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  calldatas?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  calldatas_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBlock?: InputMaybe<Scalars['BigInt']>;
  createdBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTransactionHash?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_not?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTransactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  createdTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  startBlock?: InputMaybe<Scalars['BigInt']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forVotes?: InputMaybe<Scalars['BigInt']>;
  forVotes_not?: InputMaybe<Scalars['BigInt']>;
  forVotes_gt?: InputMaybe<Scalars['BigInt']>;
  forVotes_lt?: InputMaybe<Scalars['BigInt']>;
  forVotes_gte?: InputMaybe<Scalars['BigInt']>;
  forVotes_lte?: InputMaybe<Scalars['BigInt']>;
  forVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstVotes?: InputMaybe<Scalars['BigInt']>;
  againstVotes_not?: InputMaybe<Scalars['BigInt']>;
  againstVotes_gt?: InputMaybe<Scalars['BigInt']>;
  againstVotes_lt?: InputMaybe<Scalars['BigInt']>;
  againstVotes_gte?: InputMaybe<Scalars['BigInt']>;
  againstVotes_lte?: InputMaybe<Scalars['BigInt']>;
  againstVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  againstVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainVotes?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_not?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_gt?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_lt?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_gte?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_lte?: InputMaybe<Scalars['BigInt']>;
  abstainVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  abstainVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  title?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProposalStatus>;
  status_not?: InputMaybe<ProposalStatus>;
  status_in?: InputMaybe<Array<ProposalStatus>>;
  status_not_in?: InputMaybe<Array<ProposalStatus>>;
  executionETA?: InputMaybe<Scalars['BigInt']>;
  executionETA_not?: InputMaybe<Scalars['BigInt']>;
  executionETA_gt?: InputMaybe<Scalars['BigInt']>;
  executionETA_lt?: InputMaybe<Scalars['BigInt']>;
  executionETA_gte?: InputMaybe<Scalars['BigInt']>;
  executionETA_lte?: InputMaybe<Scalars['BigInt']>;
  executionETA_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executionETA_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votes_?: InputMaybe<Vote_filter>;
  events_?: InputMaybe<ProposalLifecycleEvent_filter>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minQuorumVotesBPS?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_not?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']>;
  minQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']>>;
  minQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']>>;
  maxQuorumVotesBPS?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_not?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_gt?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_lt?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_gte?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_lte?: InputMaybe<Scalars['Int']>;
  maxQuorumVotesBPS_in?: InputMaybe<Array<Scalars['Int']>>;
  maxQuorumVotesBPS_not_in?: InputMaybe<Array<Scalars['Int']>>;
  quorumCoefficient?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_not?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_gt?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_lt?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_gte?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_lte?: InputMaybe<Scalars['BigInt']>;
  quorumCoefficient_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorumCoefficient_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  dynamicQuorumParams: Array<DynamicQuorumParams>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryogTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgTransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgTransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogGnarArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogGnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgGnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgGnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogAuctionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryogAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegationEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegationEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryseedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryseedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Seed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Seed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Auction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Auction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionHouseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionHousesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuctionHouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionHouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarvingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygnarvingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnarving_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnarving_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalLifecycleEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalLifecycleEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydynamicQuorumParamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
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
  id: Scalars['ID'];
  /** The background index */
  background: Scalars['BigInt'];
  /** The body index */
  body: Scalars['BigInt'];
  /** The accessory index */
  accessory: Scalars['BigInt'];
  /** The head index */
  head: Scalars['BigInt'];
  /** The glasses index */
  glasses: Scalars['BigInt'];
};

export type Seed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  background?: InputMaybe<Scalars['BigInt']>;
  background_not?: InputMaybe<Scalars['BigInt']>;
  background_gt?: InputMaybe<Scalars['BigInt']>;
  background_lt?: InputMaybe<Scalars['BigInt']>;
  background_gte?: InputMaybe<Scalars['BigInt']>;
  background_lte?: InputMaybe<Scalars['BigInt']>;
  background_in?: InputMaybe<Array<Scalars['BigInt']>>;
  background_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  body?: InputMaybe<Scalars['BigInt']>;
  body_not?: InputMaybe<Scalars['BigInt']>;
  body_gt?: InputMaybe<Scalars['BigInt']>;
  body_lt?: InputMaybe<Scalars['BigInt']>;
  body_gte?: InputMaybe<Scalars['BigInt']>;
  body_lte?: InputMaybe<Scalars['BigInt']>;
  body_in?: InputMaybe<Array<Scalars['BigInt']>>;
  body_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accessory?: InputMaybe<Scalars['BigInt']>;
  accessory_not?: InputMaybe<Scalars['BigInt']>;
  accessory_gt?: InputMaybe<Scalars['BigInt']>;
  accessory_lt?: InputMaybe<Scalars['BigInt']>;
  accessory_gte?: InputMaybe<Scalars['BigInt']>;
  accessory_lte?: InputMaybe<Scalars['BigInt']>;
  accessory_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accessory_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  head?: InputMaybe<Scalars['BigInt']>;
  head_not?: InputMaybe<Scalars['BigInt']>;
  head_gt?: InputMaybe<Scalars['BigInt']>;
  head_lt?: InputMaybe<Scalars['BigInt']>;
  head_gte?: InputMaybe<Scalars['BigInt']>;
  head_lte?: InputMaybe<Scalars['BigInt']>;
  head_in?: InputMaybe<Array<Scalars['BigInt']>>;
  head_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  glasses?: InputMaybe<Scalars['BigInt']>;
  glasses_not?: InputMaybe<Scalars['BigInt']>;
  glasses_gt?: InputMaybe<Scalars['BigInt']>;
  glasses_lt?: InputMaybe<Scalars['BigInt']>;
  glasses_gte?: InputMaybe<Scalars['BigInt']>;
  glasses_lte?: InputMaybe<Scalars['BigInt']>;
  glasses_in?: InputMaybe<Array<Scalars['BigInt']>>;
  glasses_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  dynamicQuorumParams: Array<DynamicQuorumParams>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionogTransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogTransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgTransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgTransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogGnarArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogGnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgGnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgGnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogAuctionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionogAuctionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OgAuction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OgAuction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegationEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegationEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegationEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegationEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionseedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionseedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Seed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Seed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Auction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Auction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionHouseArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionHousesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuctionHouse_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionHouse_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarvingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongnarvingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnarving_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnarving_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionaccountsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Account_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Proposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalLifecycleEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalLifecycleEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalLifecycleEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalLifecycleEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongovernancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Governance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Governance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondynamicQuorumParamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
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
  id: Scalars['ID'];
  /** The Gnar being transfered */
  gnar: Gnar;
  /** Previous holder address */
  previousHolder: Account;
  /** New holder address */
  newHolder: Account;
  /** Block number of the event */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of the block the event is in */
  blockTimestamp: Scalars['BigInt'];
};

export type TransferEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  gnar?: InputMaybe<Scalars['String']>;
  gnar_not?: InputMaybe<Scalars['String']>;
  gnar_gt?: InputMaybe<Scalars['String']>;
  gnar_lt?: InputMaybe<Scalars['String']>;
  gnar_gte?: InputMaybe<Scalars['String']>;
  gnar_lte?: InputMaybe<Scalars['String']>;
  gnar_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_not_in?: InputMaybe<Array<Scalars['String']>>;
  gnar_contains?: InputMaybe<Scalars['String']>;
  gnar_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_contains?: InputMaybe<Scalars['String']>;
  gnar_not_contains_nocase?: InputMaybe<Scalars['String']>;
  gnar_starts_with?: InputMaybe<Scalars['String']>;
  gnar_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with?: InputMaybe<Scalars['String']>;
  gnar_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_ends_with?: InputMaybe<Scalars['String']>;
  gnar_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with?: InputMaybe<Scalars['String']>;
  gnar_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  gnar_?: InputMaybe<Gnar_filter>;
  previousHolder?: InputMaybe<Scalars['String']>;
  previousHolder_not?: InputMaybe<Scalars['String']>;
  previousHolder_gt?: InputMaybe<Scalars['String']>;
  previousHolder_lt?: InputMaybe<Scalars['String']>;
  previousHolder_gte?: InputMaybe<Scalars['String']>;
  previousHolder_lte?: InputMaybe<Scalars['String']>;
  previousHolder_in?: InputMaybe<Array<Scalars['String']>>;
  previousHolder_not_in?: InputMaybe<Array<Scalars['String']>>;
  previousHolder_contains?: InputMaybe<Scalars['String']>;
  previousHolder_contains_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_not_contains?: InputMaybe<Scalars['String']>;
  previousHolder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_starts_with?: InputMaybe<Scalars['String']>;
  previousHolder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_not_starts_with?: InputMaybe<Scalars['String']>;
  previousHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_ends_with?: InputMaybe<Scalars['String']>;
  previousHolder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_not_ends_with?: InputMaybe<Scalars['String']>;
  previousHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousHolder_?: InputMaybe<Account_filter>;
  newHolder?: InputMaybe<Scalars['String']>;
  newHolder_not?: InputMaybe<Scalars['String']>;
  newHolder_gt?: InputMaybe<Scalars['String']>;
  newHolder_lt?: InputMaybe<Scalars['String']>;
  newHolder_gte?: InputMaybe<Scalars['String']>;
  newHolder_lte?: InputMaybe<Scalars['String']>;
  newHolder_in?: InputMaybe<Array<Scalars['String']>>;
  newHolder_not_in?: InputMaybe<Array<Scalars['String']>>;
  newHolder_contains?: InputMaybe<Scalars['String']>;
  newHolder_contains_nocase?: InputMaybe<Scalars['String']>;
  newHolder_not_contains?: InputMaybe<Scalars['String']>;
  newHolder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  newHolder_starts_with?: InputMaybe<Scalars['String']>;
  newHolder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newHolder_not_starts_with?: InputMaybe<Scalars['String']>;
  newHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newHolder_ends_with?: InputMaybe<Scalars['String']>;
  newHolder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newHolder_not_ends_with?: InputMaybe<Scalars['String']>;
  newHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newHolder_?: InputMaybe<Account_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  id: Scalars['ID'];
  /** Whether the vote is in favour of the proposal */
  support: Scalars['Boolean'];
  /** The integer support value: against (0), for (1), or abstain (2) */
  supportDetailed: Scalars['Int'];
  /** Amount of votes in favour or against expressed in the smallest unit of the Gnars ERC721 Token */
  votesRaw: Scalars['BigInt'];
  /** Amount of votes in favour or against expressed as a BigInt normalized value for the Gnars ERC721 Token */
  votes: Scalars['BigInt'];
  /** The optional vote reason */
  reason?: Maybe<Scalars['String']>;
  /** Delegate that emitted the vote */
  voter: Delegate;
  /** The Gnars used to vote */
  gnars?: Maybe<Array<Gnar>>;
  /** Proposal that is being voted on */
  proposal: Proposal;
  /** Block number of vote */
  blockNumber: Scalars['BigInt'];
  /** The timestamp of the block the vote is in */
  blockTimestamp: Scalars['BigInt'];
};


export type VotegnarsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gnar_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Gnar_filter>;
};

export type Vote_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  support?: InputMaybe<Scalars['Boolean']>;
  support_not?: InputMaybe<Scalars['Boolean']>;
  support_in?: InputMaybe<Array<Scalars['Boolean']>>;
  support_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  supportDetailed?: InputMaybe<Scalars['Int']>;
  supportDetailed_not?: InputMaybe<Scalars['Int']>;
  supportDetailed_gt?: InputMaybe<Scalars['Int']>;
  supportDetailed_lt?: InputMaybe<Scalars['Int']>;
  supportDetailed_gte?: InputMaybe<Scalars['Int']>;
  supportDetailed_lte?: InputMaybe<Scalars['Int']>;
  supportDetailed_in?: InputMaybe<Array<Scalars['Int']>>;
  supportDetailed_not_in?: InputMaybe<Array<Scalars['Int']>>;
  votesRaw?: InputMaybe<Scalars['BigInt']>;
  votesRaw_not?: InputMaybe<Scalars['BigInt']>;
  votesRaw_gt?: InputMaybe<Scalars['BigInt']>;
  votesRaw_lt?: InputMaybe<Scalars['BigInt']>;
  votesRaw_gte?: InputMaybe<Scalars['BigInt']>;
  votesRaw_lte?: InputMaybe<Scalars['BigInt']>;
  votesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votes?: InputMaybe<Scalars['BigInt']>;
  votes_not?: InputMaybe<Scalars['BigInt']>;
  votes_gt?: InputMaybe<Scalars['BigInt']>;
  votes_lt?: InputMaybe<Scalars['BigInt']>;
  votes_gte?: InputMaybe<Scalars['BigInt']>;
  votes_lte?: InputMaybe<Scalars['BigInt']>;
  votes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reason?: InputMaybe<Scalars['String']>;
  reason_not?: InputMaybe<Scalars['String']>;
  reason_gt?: InputMaybe<Scalars['String']>;
  reason_lt?: InputMaybe<Scalars['String']>;
  reason_gte?: InputMaybe<Scalars['String']>;
  reason_lte?: InputMaybe<Scalars['String']>;
  reason_in?: InputMaybe<Array<Scalars['String']>>;
  reason_not_in?: InputMaybe<Array<Scalars['String']>>;
  reason_contains?: InputMaybe<Scalars['String']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_not_contains?: InputMaybe<Scalars['String']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_starts_with?: InputMaybe<Scalars['String']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_starts_with?: InputMaybe<Scalars['String']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_ends_with?: InputMaybe<Scalars['String']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter?: InputMaybe<Scalars['String']>;
  voter_not?: InputMaybe<Scalars['String']>;
  voter_gt?: InputMaybe<Scalars['String']>;
  voter_lt?: InputMaybe<Scalars['String']>;
  voter_gte?: InputMaybe<Scalars['String']>;
  voter_lte?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<Scalars['String']>>;
  voter_not_in?: InputMaybe<Array<Scalars['String']>>;
  voter_contains?: InputMaybe<Scalars['String']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_not_contains?: InputMaybe<Scalars['String']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_starts_with?: InputMaybe<Scalars['String']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_starts_with?: InputMaybe<Scalars['String']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_ends_with?: InputMaybe<Scalars['String']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_?: InputMaybe<Delegate_filter>;
  gnars?: InputMaybe<Array<Scalars['String']>>;
  gnars_not?: InputMaybe<Array<Scalars['String']>>;
  gnars_contains?: InputMaybe<Array<Scalars['String']>>;
  gnars_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gnars_not_contains?: InputMaybe<Array<Scalars['String']>>;
  gnars_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  gnars_?: InputMaybe<Gnar_filter>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_?: InputMaybe<Proposal_filter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
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
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["gnars"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
