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
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { JodobixOpSepoliaTypes } from './sources/jodobix-op-sepolia/types';
import type { JodobixOpMainnetTypes } from './sources/jodobix-op-mainnet/types';
import * as importedModule$0 from "./sources/jodobix-op-sepolia/introspectionSchema";
import * as importedModule$1 from "./sources/jodobix-op-mainnet/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type Query = {
  betPlaced?: Maybe<BetPlaced>;
  betPlaceds: Array<BetPlaced>;
  endOfBettingPeriod?: Maybe<EndOfBettingPeriod>;
  endOfBettingPeriods: Array<EndOfBettingPeriod>;
  gameCreated?: Maybe<GameCreated>;
  gameCreateds: Array<GameCreated>;
  prizePayment?: Maybe<PrizePayment>;
  prizePayments: Array<PrizePayment>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerybetPlacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybetPlacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BetPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BetPlaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryendOfBettingPeriodArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryendOfBettingPeriodsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<EndOfBettingPeriod_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EndOfBettingPeriod_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygameCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GameCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GameCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprizePaymentArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprizePaymentsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PrizePayment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PrizePayment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BetPlaced = {
  id: Scalars['Bytes']['output'];
  gameId: Scalars['BigInt']['output'];
  bettor: Scalars['Bytes']['output'];
  number: Scalars['Int']['output'];
  value: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  betId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BetPlaced_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gameId?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_not?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gameId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bettor?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_not?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bettor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bettor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_not?: InputMaybe<Scalars['Int']['input']>;
  number_gt?: InputMaybe<Scalars['Int']['input']>;
  number_lt?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
  number_lte?: InputMaybe<Scalars['Int']['input']>;
  number_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  number_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BetPlaced_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BetPlaced_filter>>>;
};

export type BetPlaced_orderBy =
  | 'id'
  | 'gameId'
  | 'bettor'
  | 'number'
  | 'value'
  | 'timestamp'
  | 'betId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type EndOfBettingPeriod = {
  id: Scalars['Bytes']['output'];
  gameId: Scalars['BigInt']['output'];
  drawnNumber: Scalars['Int']['output'];
  closer: Scalars['Bytes']['output'];
  reward: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type EndOfBettingPeriod_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gameId?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_not?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gameId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  drawnNumber?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_not?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  drawnNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  closer?: InputMaybe<Scalars['Bytes']['input']>;
  closer_not?: InputMaybe<Scalars['Bytes']['input']>;
  closer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  closer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  closer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  closer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  closer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  closer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  closer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  reward?: InputMaybe<Scalars['BigInt']['input']>;
  reward_not?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EndOfBettingPeriod_filter>>>;
  or?: InputMaybe<Array<InputMaybe<EndOfBettingPeriod_filter>>>;
};

export type EndOfBettingPeriod_orderBy =
  | 'id'
  | 'gameId'
  | 'drawnNumber'
  | 'closer'
  | 'reward'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type GameCreated = {
  id: Scalars['Bytes']['output'];
  gameId: Scalars['BigInt']['output'];
  creator: Scalars['Bytes']['output'];
  isPrivate: Scalars['Boolean']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type GameCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gameId?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_not?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gameId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  creator?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate_not?: InputMaybe<Scalars['Boolean']['input']>;
  isPrivate_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isPrivate_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GameCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GameCreated_filter>>>;
};

export type GameCreated_orderBy =
  | 'id'
  | 'gameId'
  | 'creator'
  | 'isPrivate'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PrizePayment = {
  id: Scalars['Bytes']['output'];
  gameId: Scalars['BigInt']['output'];
  betId: Scalars['BigInt']['output'];
  bettor: Scalars['Bytes']['output'];
  requestedBy: Scalars['Bytes']['output'];
  drawnNumber: Scalars['Int']['output'];
  prizeValue: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PrizePayment_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gameId?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_not?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gameId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gameId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bettor?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_not?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bettor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bettor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bettor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_not?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_gt?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_lt?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_gte?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_lte?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  requestedBy_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  requestedBy_contains?: InputMaybe<Scalars['Bytes']['input']>;
  requestedBy_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  drawnNumber?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_not?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  drawnNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  drawnNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  prizeValue?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_not?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  prizeValue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  prizeValue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PrizePayment_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PrizePayment_filter>>>;
};

export type PrizePayment_orderBy =
  | 'id'
  | 'gameId'
  | 'betId'
  | 'bettor'
  | 'requestedBy'
  | 'drawnNumber'
  | 'prizeValue'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

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
  Query: ResolverTypeWrapper<{}>;
  Aggregation_interval: Aggregation_interval;
  BetPlaced: ResolverTypeWrapper<BetPlaced>;
  BetPlaced_filter: BetPlaced_filter;
  BetPlaced_orderBy: BetPlaced_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  EndOfBettingPeriod: ResolverTypeWrapper<EndOfBettingPeriod>;
  EndOfBettingPeriod_filter: EndOfBettingPeriod_filter;
  EndOfBettingPeriod_orderBy: EndOfBettingPeriod_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GameCreated: ResolverTypeWrapper<GameCreated>;
  GameCreated_filter: GameCreated_filter;
  GameCreated_orderBy: GameCreated_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  PrizePayment: ResolverTypeWrapper<PrizePayment>;
  PrizePayment_filter: PrizePayment_filter;
  PrizePayment_orderBy: PrizePayment_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  BetPlaced: BetPlaced;
  BetPlaced_filter: BetPlaced_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  EndOfBettingPeriod: EndOfBettingPeriod;
  EndOfBettingPeriod_filter: EndOfBettingPeriod_filter;
  Float: Scalars['Float']['output'];
  GameCreated: GameCreated;
  GameCreated_filter: GameCreated_filter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  PrizePayment: PrizePayment;
  PrizePayment_filter: PrizePayment_filter;
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  betPlaced?: Resolver<Maybe<ResolversTypes['BetPlaced']>, ParentType, ContextType, RequireFields<QuerybetPlacedArgs, 'id' | 'subgraphError'>>;
  betPlaceds?: Resolver<Array<ResolversTypes['BetPlaced']>, ParentType, ContextType, RequireFields<QuerybetPlacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  endOfBettingPeriod?: Resolver<Maybe<ResolversTypes['EndOfBettingPeriod']>, ParentType, ContextType, RequireFields<QueryendOfBettingPeriodArgs, 'id' | 'subgraphError'>>;
  endOfBettingPeriods?: Resolver<Array<ResolversTypes['EndOfBettingPeriod']>, ParentType, ContextType, RequireFields<QueryendOfBettingPeriodsArgs, 'skip' | 'first' | 'subgraphError'>>;
  gameCreated?: Resolver<Maybe<ResolversTypes['GameCreated']>, ParentType, ContextType, RequireFields<QuerygameCreatedArgs, 'id' | 'subgraphError'>>;
  gameCreateds?: Resolver<Array<ResolversTypes['GameCreated']>, ParentType, ContextType, RequireFields<QuerygameCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  prizePayment?: Resolver<Maybe<ResolversTypes['PrizePayment']>, ParentType, ContextType, RequireFields<QueryprizePaymentArgs, 'id' | 'subgraphError'>>;
  prizePayments?: Resolver<Array<ResolversTypes['PrizePayment']>, ParentType, ContextType, RequireFields<QueryprizePaymentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type BetPlacedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BetPlaced'] = ResolversParentTypes['BetPlaced']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bettor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  betId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
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

export type EndOfBettingPeriodResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EndOfBettingPeriod'] = ResolversParentTypes['EndOfBettingPeriod']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  drawnNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  closer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GameCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GameCreated'] = ResolversParentTypes['GameCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type PrizePaymentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PrizePayment'] = ResolversParentTypes['PrizePayment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  betId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bettor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  requestedBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  drawnNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prizeValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  BetPlaced?: BetPlacedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  EndOfBettingPeriod?: EndOfBettingPeriodResolvers<ContextType>;
  GameCreated?: GameCreatedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  PrizePayment?: PrizePaymentResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = JodobixOpMainnetTypes.Context & JodobixOpSepoliaTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/jodobix-op-sepolia/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".graphclient/sources/jodobix-op-mainnet/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
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
const jodobixOpMainnetTransforms = [];
const jodobixOpSepoliaTransforms = [];
const additionalTypeDefs = [] as any[];
const jodobixOpMainnetHandler = new GraphqlHandler({
              name: "jodobix-op-mainnet",
              config: {"endpoint":"https://gateway.thegraph.com/api/adca8d5ca99b5c886296cdbf714ddf6b/subgraphs/id/CNojXnaokkytgd54qTvamsYWtKfCjnXm6afHXzKNAT4G"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("jodobix-op-mainnet"),
              logger: logger.child("jodobix-op-mainnet"),
              importFn,
            });
const jodobixOpSepoliaHandler = new GraphqlHandler({
              name: "jodobix-op-sepolia",
              config: {"endpoint":"https://gateway.thegraph.com/api/adca8d5ca99b5c886296cdbf714ddf6b/subgraphs/id/62tPEBeCiSXAxZUtSiCRcM2UMzTpXtmbs6ABcetyEgfW"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("jodobix-op-sepolia"),
              logger: logger.child("jodobix-op-sepolia"),
              importFn,
            });
sources[0] = {
          name: 'jodobix-op-mainnet',
          handler: jodobixOpMainnetHandler,
          transforms: jodobixOpMainnetTransforms
        }
sources[1] = {
          name: 'jodobix-op-sepolia',
          handler: jodobixOpSepoliaHandler,
          transforms: jodobixOpSepoliaTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })
const documentHashMap = {
        "267ad73e638a85666fd849ba69c892326055d6a7a8a17ddebb441dc9003a51f0": BetsPlacedDocument,
"f8b7c3a0937bfd2e1ca126d8687a2df454e8b78d9b5f5cc51cb61f16d8a11219": EndsOfBettingPeriodDocument,
"1660e83a8060a699d2aaa2433529f5a4705ac1385f2efac829ac77ca92a66539": GamesCreatedDocument,
"1a10ff92996b6959c5bc1e9836a06bafaccf4e045bf61e28325b0cd341c111a7": PrizePaymentsDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

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
        document: BetsPlacedDocument,
        get rawSDL() {
          return printWithCache(BetsPlacedDocument);
        },
        location: 'BetsPlacedDocument.graphql',
        sha256Hash: '267ad73e638a85666fd849ba69c892326055d6a7a8a17ddebb441dc9003a51f0'
      },{
        document: EndsOfBettingPeriodDocument,
        get rawSDL() {
          return printWithCache(EndsOfBettingPeriodDocument);
        },
        location: 'EndsOfBettingPeriodDocument.graphql',
        sha256Hash: 'f8b7c3a0937bfd2e1ca126d8687a2df454e8b78d9b5f5cc51cb61f16d8a11219'
      },{
        document: GamesCreatedDocument,
        get rawSDL() {
          return printWithCache(GamesCreatedDocument);
        },
        location: 'GamesCreatedDocument.graphql',
        sha256Hash: '1660e83a8060a699d2aaa2433529f5a4705ac1385f2efac829ac77ca92a66539'
      },{
        document: PrizePaymentsDocument,
        get rawSDL() {
          return printWithCache(PrizePaymentsDocument);
        },
        location: 'PrizePaymentsDocument.graphql',
        sha256Hash: '1a10ff92996b6959c5bc1e9836a06bafaccf4e045bf61e28325b0cd341c111a7'
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

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
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
export type BetsPlacedQueryVariables = Exact<{
  where?: InputMaybe<BetPlaced_filter>;
}>;


export type BetsPlacedQuery = { betPlaceds: Array<Pick<BetPlaced, 'gameId' | 'bettor' | 'number' | 'value' | 'timestamp' | 'betId' | 'blockNumber' | 'blockTimestamp' | 'transactionHash'>> };

export type EndsOfBettingPeriodQueryVariables = Exact<{
  where?: InputMaybe<EndOfBettingPeriod_filter>;
}>;


export type EndsOfBettingPeriodQuery = { endOfBettingPeriods: Array<Pick<EndOfBettingPeriod, 'gameId' | 'drawnNumber' | 'closer' | 'reward' | 'timestamp' | 'blockNumber' | 'blockTimestamp' | 'transactionHash'>> };

export type GamesCreatedQueryVariables = Exact<{
  where?: InputMaybe<GameCreated_filter>;
}>;


export type GamesCreatedQuery = { gameCreateds: Array<Pick<GameCreated, 'gameId' | 'creator' | 'isPrivate' | 'timestamp' | 'blockNumber' | 'blockTimestamp' | 'transactionHash'>> };

export type PrizePaymentsQueryVariables = Exact<{
  where?: InputMaybe<PrizePayment_filter>;
}>;


export type PrizePaymentsQuery = { prizePayments: Array<Pick<PrizePayment, 'gameId' | 'betId' | 'bettor' | 'requestedBy' | 'drawnNumber' | 'prizeValue' | 'timestamp' | 'blockNumber' | 'blockTimestamp' | 'transactionHash'>> };


export const BetsPlacedDocument = gql`
    query BetsPlaced($where: BetPlaced_filter) {
  betPlaceds(where: $where) {
    gameId
    bettor
    number
    value
    timestamp
    betId
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    ` as unknown as DocumentNode<BetsPlacedQuery, BetsPlacedQueryVariables>;
export const EndsOfBettingPeriodDocument = gql`
    query EndsOfBettingPeriod($where: EndOfBettingPeriod_filter) {
  endOfBettingPeriods(where: $where) {
    gameId
    drawnNumber
    closer
    reward
    timestamp
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    ` as unknown as DocumentNode<EndsOfBettingPeriodQuery, EndsOfBettingPeriodQueryVariables>;
export const GamesCreatedDocument = gql`
    query GamesCreated($where: GameCreated_filter) {
  gameCreateds(where: $where) {
    gameId
    creator
    isPrivate
    timestamp
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    ` as unknown as DocumentNode<GamesCreatedQuery, GamesCreatedQueryVariables>;
export const PrizePaymentsDocument = gql`
    query PrizePayments($where: PrizePayment_filter) {
  prizePayments(where: $where) {
    gameId
    betId
    bettor
    requestedBy
    drawnNumber
    prizeValue
    timestamp
    blockNumber
    blockTimestamp
    transactionHash
  }
}
    ` as unknown as DocumentNode<PrizePaymentsQuery, PrizePaymentsQueryVariables>;





export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    BetsPlaced(variables?: BetsPlacedQueryVariables, options?: C): Promise<BetsPlacedQuery> {
      return requester<BetsPlacedQuery, BetsPlacedQueryVariables>(BetsPlacedDocument, variables, options) as Promise<BetsPlacedQuery>;
    },
    EndsOfBettingPeriod(variables?: EndsOfBettingPeriodQueryVariables, options?: C): Promise<EndsOfBettingPeriodQuery> {
      return requester<EndsOfBettingPeriodQuery, EndsOfBettingPeriodQueryVariables>(EndsOfBettingPeriodDocument, variables, options) as Promise<EndsOfBettingPeriodQuery>;
    },
    GamesCreated(variables?: GamesCreatedQueryVariables, options?: C): Promise<GamesCreatedQuery> {
      return requester<GamesCreatedQuery, GamesCreatedQueryVariables>(GamesCreatedDocument, variables, options) as Promise<GamesCreatedQuery>;
    },
    PrizePayments(variables?: PrizePaymentsQueryVariables, options?: C): Promise<PrizePaymentsQuery> {
      return requester<PrizePaymentsQuery, PrizePaymentsQueryVariables>(PrizePaymentsDocument, variables, options) as Promise<PrizePaymentsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;