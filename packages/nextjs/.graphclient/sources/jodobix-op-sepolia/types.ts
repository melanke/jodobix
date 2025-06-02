// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace JodobixOpSepoliaTypes {
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
  betPlaced: InContextSdkMethod<Query['betPlaced'], QuerybetPlacedArgs, MeshContext>,
  /** null **/
  betPlaceds: InContextSdkMethod<Query['betPlaceds'], QuerybetPlacedsArgs, MeshContext>,
  /** null **/
  endOfBettingPeriod: InContextSdkMethod<Query['endOfBettingPeriod'], QueryendOfBettingPeriodArgs, MeshContext>,
  /** null **/
  endOfBettingPeriods: InContextSdkMethod<Query['endOfBettingPeriods'], QueryendOfBettingPeriodsArgs, MeshContext>,
  /** null **/
  gameCreated: InContextSdkMethod<Query['gameCreated'], QuerygameCreatedArgs, MeshContext>,
  /** null **/
  gameCreateds: InContextSdkMethod<Query['gameCreateds'], QuerygameCreatedsArgs, MeshContext>,
  /** null **/
  prizePayment: InContextSdkMethod<Query['prizePayment'], QueryprizePaymentArgs, MeshContext>,
  /** null **/
  prizePayments: InContextSdkMethod<Query['prizePayments'], QueryprizePaymentsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["jodobix-op-sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
