// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BlockTrackingTransform from "@graphprotocol/client-block-tracking";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GnarsTypes } from './sources/gnars/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  | 'blockNumber';

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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  Account_filter: Account_filter;
  Account_orderBy: Account_orderBy;
  Auction: ResolverTypeWrapper<Auction>;
  AuctionHouse: ResolverTypeWrapper<AuctionHouse>;
  AuctionHouse_filter: AuctionHouse_filter;
  AuctionHouse_orderBy: AuctionHouse_orderBy;
  Auction_filter: Auction_filter;
  Auction_orderBy: Auction_orderBy;
  Bid: ResolverTypeWrapper<Bid>;
  Bid_filter: Bid_filter;
  Bid_orderBy: Bid_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Delegate: ResolverTypeWrapper<Delegate>;
  Delegate_filter: Delegate_filter;
  Delegate_orderBy: Delegate_orderBy;
  DelegationEvent: ResolverTypeWrapper<DelegationEvent>;
  DelegationEvent_filter: DelegationEvent_filter;
  DelegationEvent_orderBy: DelegationEvent_orderBy;
  DynamicQuorumParams: ResolverTypeWrapper<DynamicQuorumParams>;
  DynamicQuorumParams_filter: DynamicQuorumParams_filter;
  DynamicQuorumParams_orderBy: DynamicQuorumParams_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gnar: ResolverTypeWrapper<Gnar>;
  Gnar_filter: Gnar_filter;
  Gnar_orderBy: Gnar_orderBy;
  Gnarving: ResolverTypeWrapper<Gnarving>;
  Gnarving_filter: Gnarving_filter;
  Gnarving_orderBy: Gnarving_orderBy;
  Governance: ResolverTypeWrapper<Governance>;
  Governance_filter: Governance_filter;
  Governance_orderBy: Governance_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OgAuction: ResolverTypeWrapper<OgAuction>;
  OgAuction_filter: OgAuction_filter;
  OgAuction_orderBy: OgAuction_orderBy;
  OgBid: ResolverTypeWrapper<OgBid>;
  OgBid_filter: OgBid_filter;
  OgBid_orderBy: OgBid_orderBy;
  OgGnar: ResolverTypeWrapper<OgGnar>;
  OgGnar_filter: OgGnar_filter;
  OgGnar_orderBy: OgGnar_orderBy;
  OgTransferEvent: ResolverTypeWrapper<OgTransferEvent>;
  OgTransferEvent_filter: OgTransferEvent_filter;
  OgTransferEvent_orderBy: OgTransferEvent_orderBy;
  OrderDirection: OrderDirection;
  Proposal: ResolverTypeWrapper<Proposal>;
  ProposalStatus: ProposalStatus;
  Proposal_filter: Proposal_filter;
  Proposal_orderBy: Proposal_orderBy;
  Query: ResolverTypeWrapper<{}>;
  Seed: ResolverTypeWrapper<Seed>;
  Seed_filter: Seed_filter;
  Seed_orderBy: Seed_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TransferEvent: ResolverTypeWrapper<TransferEvent>;
  TransferEvent_filter: TransferEvent_filter;
  TransferEvent_orderBy: TransferEvent_orderBy;
  Vote: ResolverTypeWrapper<Vote>;
  Vote_filter: Vote_filter;
  Vote_orderBy: Vote_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Account_filter: Account_filter;
  Auction: Auction;
  AuctionHouse: AuctionHouse;
  AuctionHouse_filter: AuctionHouse_filter;
  Auction_filter: Auction_filter;
  Bid: Bid;
  Bid_filter: Bid_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Delegate: Delegate;
  Delegate_filter: Delegate_filter;
  DelegationEvent: DelegationEvent;
  DelegationEvent_filter: DelegationEvent_filter;
  DynamicQuorumParams: DynamicQuorumParams;
  DynamicQuorumParams_filter: DynamicQuorumParams_filter;
  Float: Scalars['Float'];
  Gnar: Gnar;
  Gnar_filter: Gnar_filter;
  Gnarving: Gnarving;
  Gnarving_filter: Gnarving_filter;
  Governance: Governance;
  Governance_filter: Governance_filter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  OgAuction: OgAuction;
  OgAuction_filter: OgAuction_filter;
  OgBid: OgBid;
  OgBid_filter: OgBid_filter;
  OgGnar: OgGnar;
  OgGnar_filter: OgGnar_filter;
  OgTransferEvent: OgTransferEvent;
  OgTransferEvent_filter: OgTransferEvent_filter;
  Proposal: Proposal;
  Proposal_filter: Proposal_filter;
  Query: {};
  Seed: Seed;
  Seed_filter: Seed_filter;
  String: Scalars['String'];
  Subscription: {};
  TransferEvent: TransferEvent;
  TransferEvent_filter: TransferEvent_filter;
  Vote: Vote;
  Vote_filter: Vote_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  delegate?: Resolver<Maybe<ResolversTypes['Delegate']>, ParentType, ContextType>;
  tokenBalanceRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenBalance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensHeldRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokensHeld?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gnars?: Resolver<Array<ResolversTypes['Gnar']>, ParentType, ContextType, RequireFields<AccountgnarsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuctionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Auction'] = ResolversParentTypes['Auction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['Gnar'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  settled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<AuctionbidsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuctionHouseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuctionHouse'] = ResolversParentTypes['AuctionHouse']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reservePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timeBuffer?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['Gnar'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction?: Resolver<ResolversTypes['Auction'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DelegateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Delegate'] = ResolversParentTypes['Delegate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  delegatedVotesRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenHoldersRepresentedAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tokenHoldersRepresented?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<DelegatetokenHoldersRepresentedArgs, 'skip' | 'first'>>;
  gnarsRepresented?: Resolver<Array<ResolversTypes['Gnar']>, ParentType, ContextType, RequireFields<DelegategnarsRepresentedArgs, 'skip' | 'first'>>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<DelegatevotesArgs, 'skip' | 'first'>>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<DelegateproposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegationEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DelegationEvent'] = ResolversParentTypes['DelegationEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['Gnar'], ParentType, ContextType>;
  previousDelegate?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  newDelegate?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DynamicQuorumParamsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DynamicQuorumParams'] = ResolversParentTypes['DynamicQuorumParams']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minQuorumVotesBPS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxQuorumVotesBPS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quorumCoefficient?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  dynamicQuorumStartBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GnarResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Gnar'] = ResolversParentTypes['Gnar']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  seed?: Resolver<Maybe<ResolversTypes['Seed']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<GnarvotesArgs, 'skip' | 'first'>>;
  auction?: Resolver<Maybe<ResolversTypes['Auction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GnarvingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Gnarving'] = ResolversParentTypes['Gnarving']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnarvings?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auctionsBetweenGnarvings?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auctionsUntilNextGnarving?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  initialAuctionDuration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auctionDuration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GovernanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Governance'] = ResolversParentTypes['Governance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proposals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentTokenHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentDelegates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalTokenHolders?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalDelegates?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotesRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  delegatedVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalsQueued?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type OgAuctionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OgAuction'] = ResolversParentTypes['OgAuction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['OgGnar'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  startBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  settled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bids?: Resolver<Array<ResolversTypes['OgBid']>, ParentType, ContextType, RequireFields<OgAuctionbidsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OgBidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OgBid'] = ResolversParentTypes['OgBid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['OgGnar'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auction?: Resolver<ResolversTypes['OgAuction'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OgGnarResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OgGnar'] = ResolversParentTypes['OgGnar']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  background?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  accessory?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  head?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  glasses?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  wasClaimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OgTransferEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OgTransferEvent'] = ResolversParentTypes['OgTransferEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['OgGnar'], ParentType, ContextType>;
  previousHolder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newHolder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Proposal'] = ResolversParentTypes['Proposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proposer?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  targets?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['BigInt']>>, ParentType, ContextType>;
  signatures?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  calldatas?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  createdTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTransactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  startBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalThreshold?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quorumVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  forVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  againstVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  abstainVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ProposalStatus'], ParentType, ContextType>;
  executionETA?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<ProposalvotesArgs, 'skip' | 'first'>>;
  totalSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minQuorumVotesBPS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxQuorumVotesBPS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quorumCoefficient?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  ogTransferEvent?: Resolver<Maybe<ResolversTypes['OgTransferEvent']>, ParentType, ContextType, RequireFields<QueryogTransferEventArgs, 'id' | 'subgraphError'>>;
  ogTransferEvents?: Resolver<Array<ResolversTypes['OgTransferEvent']>, ParentType, ContextType, RequireFields<QueryogTransferEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogGnar?: Resolver<Maybe<ResolversTypes['OgGnar']>, ParentType, ContextType, RequireFields<QueryogGnarArgs, 'id' | 'subgraphError'>>;
  ogGnars?: Resolver<Array<ResolversTypes['OgGnar']>, ParentType, ContextType, RequireFields<QueryogGnarsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogBid?: Resolver<Maybe<ResolversTypes['OgBid']>, ParentType, ContextType, RequireFields<QueryogBidArgs, 'id' | 'subgraphError'>>;
  ogBids?: Resolver<Array<ResolversTypes['OgBid']>, ParentType, ContextType, RequireFields<QueryogBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogAuction?: Resolver<Maybe<ResolversTypes['OgAuction']>, ParentType, ContextType, RequireFields<QueryogAuctionArgs, 'id' | 'subgraphError'>>;
  ogAuctions?: Resolver<Array<ResolversTypes['OgAuction']>, ParentType, ContextType, RequireFields<QueryogAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegationEvent?: Resolver<Maybe<ResolversTypes['DelegationEvent']>, ParentType, ContextType, RequireFields<QuerydelegationEventArgs, 'id' | 'subgraphError'>>;
  delegationEvents?: Resolver<Array<ResolversTypes['DelegationEvent']>, ParentType, ContextType, RequireFields<QuerydelegationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transferEvent?: Resolver<Maybe<ResolversTypes['TransferEvent']>, ParentType, ContextType, RequireFields<QuerytransferEventArgs, 'id' | 'subgraphError'>>;
  transferEvents?: Resolver<Array<ResolversTypes['TransferEvent']>, ParentType, ContextType, RequireFields<QuerytransferEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  seed?: Resolver<Maybe<ResolversTypes['Seed']>, ParentType, ContextType, RequireFields<QueryseedArgs, 'id' | 'subgraphError'>>;
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType, RequireFields<QueryseedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  gnar?: Resolver<Maybe<ResolversTypes['Gnar']>, ParentType, ContextType, RequireFields<QuerygnarArgs, 'id' | 'subgraphError'>>;
  gnars?: Resolver<Array<ResolversTypes['Gnar']>, ParentType, ContextType, RequireFields<QuerygnarsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidArgs, 'id' | 'subgraphError'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auction?: Resolver<Maybe<ResolversTypes['Auction']>, ParentType, ContextType, RequireFields<QueryauctionArgs, 'id' | 'subgraphError'>>;
  auctions?: Resolver<Array<ResolversTypes['Auction']>, ParentType, ContextType, RequireFields<QueryauctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionHouse?: Resolver<Maybe<ResolversTypes['AuctionHouse']>, ParentType, ContextType, RequireFields<QueryauctionHouseArgs, 'id' | 'subgraphError'>>;
  auctionHouses?: Resolver<Array<ResolversTypes['AuctionHouse']>, ParentType, ContextType, RequireFields<QueryauctionHousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  gnarving?: Resolver<Maybe<ResolversTypes['Gnarving']>, ParentType, ContextType, RequireFields<QuerygnarvingArgs, 'id' | 'subgraphError'>>;
  gnarvings?: Resolver<Array<ResolversTypes['Gnarving']>, ParentType, ContextType, RequireFields<QuerygnarvingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegate?: Resolver<Maybe<ResolversTypes['Delegate']>, ParentType, ContextType, RequireFields<QuerydelegateArgs, 'id' | 'subgraphError'>>;
  delegates?: Resolver<Array<ResolversTypes['Delegate']>, ParentType, ContextType, RequireFields<QuerydelegatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: Resolver<Maybe<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: Resolver<Array<ResolversTypes['Proposal']>, ParentType, ContextType, RequireFields<QueryproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvoteArgs, 'id' | 'subgraphError'>>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governance?: Resolver<Maybe<ResolversTypes['Governance']>, ParentType, ContextType, RequireFields<QuerygovernanceArgs, 'id' | 'subgraphError'>>;
  governances?: Resolver<Array<ResolversTypes['Governance']>, ParentType, ContextType, RequireFields<QuerygovernancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  dynamicQuorumParams?: Resolver<Array<ResolversTypes['DynamicQuorumParams']>, ParentType, ContextType, RequireFields<QuerydynamicQuorumParamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SeedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Seed'] = ResolversParentTypes['Seed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  background?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  accessory?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  head?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  glasses?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  ogTransferEvent?: SubscriptionResolver<Maybe<ResolversTypes['OgTransferEvent']>, "ogTransferEvent", ParentType, ContextType, RequireFields<SubscriptionogTransferEventArgs, 'id' | 'subgraphError'>>;
  ogTransferEvents?: SubscriptionResolver<Array<ResolversTypes['OgTransferEvent']>, "ogTransferEvents", ParentType, ContextType, RequireFields<SubscriptionogTransferEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogGnar?: SubscriptionResolver<Maybe<ResolversTypes['OgGnar']>, "ogGnar", ParentType, ContextType, RequireFields<SubscriptionogGnarArgs, 'id' | 'subgraphError'>>;
  ogGnars?: SubscriptionResolver<Array<ResolversTypes['OgGnar']>, "ogGnars", ParentType, ContextType, RequireFields<SubscriptionogGnarsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogBid?: SubscriptionResolver<Maybe<ResolversTypes['OgBid']>, "ogBid", ParentType, ContextType, RequireFields<SubscriptionogBidArgs, 'id' | 'subgraphError'>>;
  ogBids?: SubscriptionResolver<Array<ResolversTypes['OgBid']>, "ogBids", ParentType, ContextType, RequireFields<SubscriptionogBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ogAuction?: SubscriptionResolver<Maybe<ResolversTypes['OgAuction']>, "ogAuction", ParentType, ContextType, RequireFields<SubscriptionogAuctionArgs, 'id' | 'subgraphError'>>;
  ogAuctions?: SubscriptionResolver<Array<ResolversTypes['OgAuction']>, "ogAuctions", ParentType, ContextType, RequireFields<SubscriptionogAuctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegationEvent?: SubscriptionResolver<Maybe<ResolversTypes['DelegationEvent']>, "delegationEvent", ParentType, ContextType, RequireFields<SubscriptiondelegationEventArgs, 'id' | 'subgraphError'>>;
  delegationEvents?: SubscriptionResolver<Array<ResolversTypes['DelegationEvent']>, "delegationEvents", ParentType, ContextType, RequireFields<SubscriptiondelegationEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transferEvent?: SubscriptionResolver<Maybe<ResolversTypes['TransferEvent']>, "transferEvent", ParentType, ContextType, RequireFields<SubscriptiontransferEventArgs, 'id' | 'subgraphError'>>;
  transferEvents?: SubscriptionResolver<Array<ResolversTypes['TransferEvent']>, "transferEvents", ParentType, ContextType, RequireFields<SubscriptiontransferEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  seed?: SubscriptionResolver<Maybe<ResolversTypes['Seed']>, "seed", ParentType, ContextType, RequireFields<SubscriptionseedArgs, 'id' | 'subgraphError'>>;
  seeds?: SubscriptionResolver<Array<ResolversTypes['Seed']>, "seeds", ParentType, ContextType, RequireFields<SubscriptionseedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  gnar?: SubscriptionResolver<Maybe<ResolversTypes['Gnar']>, "gnar", ParentType, ContextType, RequireFields<SubscriptiongnarArgs, 'id' | 'subgraphError'>>;
  gnars?: SubscriptionResolver<Array<ResolversTypes['Gnar']>, "gnars", ParentType, ContextType, RequireFields<SubscriptiongnarsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: SubscriptionResolver<Maybe<ResolversTypes['Bid']>, "bid", ParentType, ContextType, RequireFields<SubscriptionbidArgs, 'id' | 'subgraphError'>>;
  bids?: SubscriptionResolver<Array<ResolversTypes['Bid']>, "bids", ParentType, ContextType, RequireFields<SubscriptionbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auction?: SubscriptionResolver<Maybe<ResolversTypes['Auction']>, "auction", ParentType, ContextType, RequireFields<SubscriptionauctionArgs, 'id' | 'subgraphError'>>;
  auctions?: SubscriptionResolver<Array<ResolversTypes['Auction']>, "auctions", ParentType, ContextType, RequireFields<SubscriptionauctionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionHouse?: SubscriptionResolver<Maybe<ResolversTypes['AuctionHouse']>, "auctionHouse", ParentType, ContextType, RequireFields<SubscriptionauctionHouseArgs, 'id' | 'subgraphError'>>;
  auctionHouses?: SubscriptionResolver<Array<ResolversTypes['AuctionHouse']>, "auctionHouses", ParentType, ContextType, RequireFields<SubscriptionauctionHousesArgs, 'skip' | 'first' | 'subgraphError'>>;
  gnarving?: SubscriptionResolver<Maybe<ResolversTypes['Gnarving']>, "gnarving", ParentType, ContextType, RequireFields<SubscriptiongnarvingArgs, 'id' | 'subgraphError'>>;
  gnarvings?: SubscriptionResolver<Array<ResolversTypes['Gnarving']>, "gnarvings", ParentType, ContextType, RequireFields<SubscriptiongnarvingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  account?: SubscriptionResolver<Maybe<ResolversTypes['Account']>, "account", ParentType, ContextType, RequireFields<SubscriptionaccountArgs, 'id' | 'subgraphError'>>;
  accounts?: SubscriptionResolver<Array<ResolversTypes['Account']>, "accounts", ParentType, ContextType, RequireFields<SubscriptionaccountsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegate?: SubscriptionResolver<Maybe<ResolversTypes['Delegate']>, "delegate", ParentType, ContextType, RequireFields<SubscriptiondelegateArgs, 'id' | 'subgraphError'>>;
  delegates?: SubscriptionResolver<Array<ResolversTypes['Delegate']>, "delegates", ParentType, ContextType, RequireFields<SubscriptiondelegatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposal?: SubscriptionResolver<Maybe<ResolversTypes['Proposal']>, "proposal", ParentType, ContextType, RequireFields<SubscriptionproposalArgs, 'id' | 'subgraphError'>>;
  proposals?: SubscriptionResolver<Array<ResolversTypes['Proposal']>, "proposals", ParentType, ContextType, RequireFields<SubscriptionproposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, "vote", ParentType, ContextType, RequireFields<SubscriptionvoteArgs, 'id' | 'subgraphError'>>;
  votes?: SubscriptionResolver<Array<ResolversTypes['Vote']>, "votes", ParentType, ContextType, RequireFields<SubscriptionvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  governance?: SubscriptionResolver<Maybe<ResolversTypes['Governance']>, "governance", ParentType, ContextType, RequireFields<SubscriptiongovernanceArgs, 'id' | 'subgraphError'>>;
  governances?: SubscriptionResolver<Array<ResolversTypes['Governance']>, "governances", ParentType, ContextType, RequireFields<SubscriptiongovernancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  dynamicQuorumParams?: SubscriptionResolver<Array<ResolversTypes['DynamicQuorumParams']>, "dynamicQuorumParams", ParentType, ContextType, RequireFields<SubscriptiondynamicQuorumParamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TransferEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TransferEvent'] = ResolversParentTypes['TransferEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gnar?: Resolver<ResolversTypes['Gnar'], ParentType, ContextType>;
  previousHolder?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  newHolder?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  support?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  supportDetailed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votesRaw?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['Delegate'], ParentType, ContextType>;
  gnars?: Resolver<Maybe<Array<ResolversTypes['Gnar']>>, ParentType, ContextType, RequireFields<VotegnarsArgs, 'skip' | 'first'>>;
  proposal?: Resolver<ResolversTypes['Proposal'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Auction?: AuctionResolvers<ContextType>;
  AuctionHouse?: AuctionHouseResolvers<ContextType>;
  Bid?: BidResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Delegate?: DelegateResolvers<ContextType>;
  DelegationEvent?: DelegationEventResolvers<ContextType>;
  DynamicQuorumParams?: DynamicQuorumParamsResolvers<ContextType>;
  Gnar?: GnarResolvers<ContextType>;
  Gnarving?: GnarvingResolvers<ContextType>;
  Governance?: GovernanceResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  OgAuction?: OgAuctionResolvers<ContextType>;
  OgBid?: OgBidResolvers<ContextType>;
  OgGnar?: OgGnarResolvers<ContextType>;
  OgTransferEvent?: OgTransferEventResolvers<ContextType>;
  Proposal?: ProposalResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Seed?: SeedResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TransferEvent?: TransferEventResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GnarsTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/gnars/introspectionSchema":
      return import("./sources/gnars/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const gnarsTransforms = [];
const additionalTypeDefs = [] as any[];
const gnarsHandler = new GraphqlHandler({
              name: "gnars",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/gnarsdao/gnars"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("gnars"),
              logger: logger.child("gnars"),
              importFn,
            });
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 12000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
gnarsTransforms[0] = new BlockTrackingTransform({
                  apiName: "gnars",
                  config: {"validateSchema":true},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'gnars',
          handler: gnarsHandler,
          transforms: gnarsTransforms
        }
const additionalResolvers = await Promise.all([
        import("../queries/resolvers")
            .then(m => m.resolvers || m.default || m)
      ]);
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: DelegateDocument,
        get rawSDL() {
          return printWithCache(DelegateDocument);
        },
        location: 'DelegateDocument.graphql'
      },{
        document: GnarDocument,
        get rawSDL() {
          return printWithCache(GnarDocument);
        },
        location: 'GnarDocument.graphql'
      },{
        document: OgGnarDocument,
        get rawSDL() {
          return printWithCache(OgGnarDocument);
        },
        location: 'OgGnarDocument.graphql'
      },{
        document: ProposalDocument,
        get rawSDL() {
          return printWithCache(ProposalDocument);
        },
        location: 'ProposalDocument.graphql'
      },{
        document: ProposalsDocument,
        get rawSDL() {
          return printWithCache(ProposalsDocument);
        },
        location: 'ProposalsDocument.graphql'
      },{
        document: WalletOgGnarsDocument,
        get rawSDL() {
          return printWithCache(WalletOgGnarsDocument);
        },
        location: 'WalletOgGnarsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type DelegateQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DelegateQuery = { account?: Maybe<(
    Pick<Account, 'tokenBalance'>
    & { delegate?: Maybe<Pick<Delegate, 'id'>> }
  )>, delegate?: Maybe<(
    Pick<Delegate, 'delegatedVotes' | 'tokenHoldersRepresentedAmount'>
    & { tokenHoldersRepresented: Array<Pick<Account, 'id' | 'tokenBalance'>> }
  )> };

export type GnarQueryVariables = Exact<{
  filter?: InputMaybe<Gnar_filter>;
}>;


export type GnarQuery = { _meta?: Maybe<{ block: Pick<_Block_, 'number' | 'timestamp'> }>, gnarving?: Maybe<Pick<Gnarving, 'auctionDuration' | 'auctionsBetweenGnarvings' | 'auctionsUntilNextGnarving'>>, gnars: Array<(
    Pick<Gnar, 'id' | 'creationTimestamp'>
    & { owner: Pick<Account, 'id'>, auction?: Maybe<(
      Pick<Auction, 'settled' | 'startTime' | 'endTime' | 'amount'>
      & { bidder?: Maybe<Pick<Account, 'id'>>, bids: Array<(
        Pick<Bid, 'amount' | 'blockTimestamp' | 'id'>
        & { bidder?: Maybe<Pick<Account, 'id'>> }
      )> }
    )>, seed?: Maybe<Pick<Seed, 'accessory' | 'background' | 'body' | 'glasses' | 'head'>> }
  )>, latestGnar: Array<Pick<Gnar, 'id'>>, latestAuction: Array<Pick<Auction, 'id'>> };

export type OGGnarQueryVariables = Exact<{
  gnarId: Scalars['ID'];
}>;


export type OGGnarQuery = { _meta?: Maybe<{ block: Pick<_Block_, 'number' | 'timestamp'> }>, gnarving?: Maybe<Pick<Gnarving, 'auctionDuration' | 'auctionsBetweenGnarvings' | 'auctionsUntilNextGnarving'>>, ogAuction?: Maybe<(
    Pick<OgAuction, 'amount' | 'bidder' | 'id'>
    & { bids: Array<Pick<OgBid, 'amount' | 'bidder' | 'blockTimestamp' | 'id'>>, gnar: Pick<OgGnar, 'accessory' | 'background' | 'body' | 'glasses' | 'head' | 'owner'> }
  )>, latestGnar: Array<Pick<Gnar, 'id'>>, latestAuction: Array<Pick<Auction, 'id'>> };

export type ProposalQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProposalQuery = { _meta?: Maybe<{ block: Pick<_Block_, 'number' | 'timestamp'> }>, proposal?: Maybe<(
    Pick<Proposal, 'id' | 'createdTimestamp' | 'startBlock' | 'endBlock' | 'executionETA' | 'title' | 'description' | 'targets' | 'values' | 'signatures' | 'calldatas' | 'status' | 'forVotes' | 'abstainVotes' | 'againstVotes' | 'quorumVotes' | 'totalSupply' | 'minQuorumVotesBPS' | 'maxQuorumVotesBPS' | 'quorumCoefficient' | 'proposalThreshold'>
    & { proposer: Pick<Delegate, 'id'>, votes: Array<(
      Pick<Vote, 'supportDetailed' | 'reason'>
      & { voter: Pick<Delegate, 'id'> }
    )> }
  )> };

export type ProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProposalsQuery = { _meta?: Maybe<{ block: Pick<_Block_, 'number' | 'timestamp'> }>, proposals: Array<(
    Pick<Proposal, 'id' | 'createdTimestamp' | 'startBlock' | 'endBlock' | 'executionETA' | 'title' | 'status' | 'forVotes' | 'abstainVotes' | 'againstVotes' | 'quorumVotes' | 'totalSupply' | 'minQuorumVotesBPS' | 'maxQuorumVotesBPS' | 'quorumCoefficient'>
    & { proposer: Pick<Delegate, 'id'> }
  )> };

export type WalletOgGnarsQueryVariables = Exact<{
  owner: Scalars['Bytes'];
}>;


export type WalletOgGnarsQuery = { ogGnars: Array<Pick<OgGnar, 'id' | 'wasClaimed' | 'accessory' | 'background' | 'body' | 'glasses' | 'head'>> };


export const DelegateDocument = gql`
    query Delegate($id: ID!) {
  account(id: $id) {
    delegate {
      id
    }
    tokenBalance
  }
  delegate(id: $id) {
    delegatedVotes
    tokenHoldersRepresentedAmount
    tokenHoldersRepresented {
      id
      tokenBalance
    }
  }
}
    ` as unknown as DocumentNode<DelegateQuery, DelegateQueryVariables>;
export const GnarDocument = gql`
    query Gnar($filter: Gnar_filter) {
  _meta {
    block {
      number
      timestamp
    }
  }
  gnarving(id: "GNARVING") {
    auctionDuration
    auctionsBetweenGnarvings
    auctionsUntilNextGnarving
  }
  gnars(
    first: 1
    orderBy: creationTimestamp
    orderDirection: desc
    where: $filter
  ) {
    id
    creationTimestamp
    owner {
      id
    }
    auction {
      settled
      startTime
      endTime
      amount
      bidder {
        id
      }
      bids(orderBy: amount, orderDirection: desc) {
        amount
        bidder {
          id
        }
        blockTimestamp
        id
      }
    }
    seed {
      accessory
      background
      body
      glasses
      head
    }
  }
  latestGnar: gnars(first: 1, orderBy: creationTimestamp, orderDirection: desc) {
    id
  }
  latestAuction: auctions(orderBy: startTime, orderDirection: desc) {
    id
  }
}
    ` as unknown as DocumentNode<GnarQuery, GnarQueryVariables>;
export const OGGnarDocument = gql`
    query OGGnar($gnarId: ID!) {
  _meta {
    block {
      number
      timestamp
    }
  }
  gnarving(id: "GNARVING") {
    auctionDuration
    auctionsBetweenGnarvings
    auctionsUntilNextGnarving
  }
  ogAuction(id: $gnarId) {
    amount
    bidder
    bids(orderBy: amount, orderDirection: desc) {
      amount
      bidder
      blockTimestamp
      id
    }
    gnar {
      accessory
      background
      body
      glasses
      head
      owner
    }
    id
  }
  latestGnar: gnars(first: 1, orderBy: creationTimestamp, orderDirection: desc) {
    id
  }
  latestAuction: auctions(orderBy: startTime, orderDirection: desc) {
    id
  }
}
    ` as unknown as DocumentNode<OGGnarQuery, OGGnarQueryVariables>;
export const ProposalDocument = gql`
    query Proposal($id: ID!) {
  _meta {
    block {
      number
      timestamp
    }
  }
  proposal(id: $id) {
    id
    createdTimestamp
    startBlock
    endBlock
    executionETA
    title
    description
    targets
    values
    signatures
    calldatas
    status
    proposer {
      id
    }
    forVotes
    abstainVotes
    againstVotes
    quorumVotes
    totalSupply
    minQuorumVotesBPS
    maxQuorumVotesBPS
    quorumCoefficient
    proposalThreshold
    votes(where: {reason_not: null}) {
      voter {
        id
      }
      supportDetailed
      reason
    }
  }
}
    ` as unknown as DocumentNode<ProposalQuery, ProposalQueryVariables>;
export const ProposalsDocument = gql`
    query Proposals {
  _meta {
    block {
      number
      timestamp
    }
  }
  proposals(orderBy: createdTimestamp, orderDirection: desc, first: 1000) {
    id
    createdTimestamp
    startBlock
    endBlock
    executionETA
    title
    status
    proposer {
      id
    }
    forVotes
    abstainVotes
    againstVotes
    quorumVotes
    totalSupply
    minQuorumVotesBPS
    maxQuorumVotesBPS
    quorumCoefficient
  }
}
    ` as unknown as DocumentNode<ProposalsQuery, ProposalsQueryVariables>;
export const WalletOgGnarsDocument = gql`
    query WalletOgGnars($owner: Bytes!) {
  ogGnars(where: {owner: $owner}) {
    id
    wasClaimed
    accessory
    background
    body
    glasses
    head
  }
}
    ` as unknown as DocumentNode<WalletOgGnarsQuery, WalletOgGnarsQueryVariables>;







export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Delegate(variables: DelegateQueryVariables, options?: C): Promise<DelegateQuery> {
      return requester<DelegateQuery, DelegateQueryVariables>(DelegateDocument, variables, options) as Promise<DelegateQuery>;
    },
    Gnar(variables?: GnarQueryVariables, options?: C): Promise<GnarQuery> {
      return requester<GnarQuery, GnarQueryVariables>(GnarDocument, variables, options) as Promise<GnarQuery>;
    },
    OGGnar(variables: OGGnarQueryVariables, options?: C): Promise<OGGnarQuery> {
      return requester<OGGnarQuery, OGGnarQueryVariables>(OGGnarDocument, variables, options) as Promise<OGGnarQuery>;
    },
    Proposal(variables: ProposalQueryVariables, options?: C): Promise<ProposalQuery> {
      return requester<ProposalQuery, ProposalQueryVariables>(ProposalDocument, variables, options) as Promise<ProposalQuery>;
    },
    Proposals(variables?: ProposalsQueryVariables, options?: C): Promise<ProposalsQuery> {
      return requester<ProposalsQuery, ProposalsQueryVariables>(ProposalsDocument, variables, options) as Promise<ProposalsQuery>;
    },
    WalletOgGnars(variables: WalletOgGnarsQueryVariables, options?: C): Promise<WalletOgGnarsQuery> {
      return requester<WalletOgGnarsQuery, WalletOgGnarsQueryVariables>(WalletOgGnarsDocument, variables, options) as Promise<WalletOgGnarsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;