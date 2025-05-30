import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BetPlaced,
  EndOfBettingPeriod,
  GameCreated,
  PrizePayment
} from "../generated/Jodobix/Jodobix"

export function createBetPlacedEvent(
  gameId: BigInt,
  bettor: Address,
  number: i32,
  value: BigInt,
  timestamp: BigInt,
  betId: BigInt
): BetPlaced {
  let betPlacedEvent = changetype<BetPlaced>(newMockEvent())

  betPlacedEvent.parameters = new Array()

  betPlacedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("bettor", ethereum.Value.fromAddress(bettor))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "number",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(number))
    )
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("betId", ethereum.Value.fromUnsignedBigInt(betId))
  )

  return betPlacedEvent
}

export function createEndOfBettingPeriodEvent(
  gameId: BigInt,
  drawnNumber: i32,
  closer: Address,
  reward: BigInt,
  timestamp: BigInt
): EndOfBettingPeriod {
  let endOfBettingPeriodEvent = changetype<EndOfBettingPeriod>(newMockEvent())

  endOfBettingPeriodEvent.parameters = new Array()

  endOfBettingPeriodEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  endOfBettingPeriodEvent.parameters.push(
    new ethereum.EventParam(
      "drawnNumber",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(drawnNumber))
    )
  )
  endOfBettingPeriodEvent.parameters.push(
    new ethereum.EventParam("closer", ethereum.Value.fromAddress(closer))
  )
  endOfBettingPeriodEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )
  endOfBettingPeriodEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return endOfBettingPeriodEvent
}

export function createGameCreatedEvent(
  gameId: BigInt,
  creator: Address,
  isPrivate: boolean,
  timestamp: BigInt
): GameCreated {
  let gameCreatedEvent = changetype<GameCreated>(newMockEvent())

  gameCreatedEvent.parameters = new Array()

  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam("isPrivate", ethereum.Value.fromBoolean(isPrivate))
  )
  gameCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return gameCreatedEvent
}

export function createPrizePaymentEvent(
  gameId: BigInt,
  betId: BigInt,
  bettor: Address,
  requestedBy: Address,
  drawnNumber: i32,
  prizeValue: BigInt,
  timestamp: BigInt
): PrizePayment {
  let prizePaymentEvent = changetype<PrizePayment>(newMockEvent())

  prizePaymentEvent.parameters = new Array()

  prizePaymentEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam("betId", ethereum.Value.fromUnsignedBigInt(betId))
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam("bettor", ethereum.Value.fromAddress(bettor))
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "requestedBy",
      ethereum.Value.fromAddress(requestedBy)
    )
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "drawnNumber",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(drawnNumber))
    )
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "prizeValue",
      ethereum.Value.fromUnsignedBigInt(prizeValue)
    )
  )
  prizePaymentEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return prizePaymentEvent
}
