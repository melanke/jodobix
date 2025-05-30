import {
  BetPlaced as BetPlacedEvent,
  EndOfBettingPeriod as EndOfBettingPeriodEvent,
  GameCreated as GameCreatedEvent,
  PrizePayment as PrizePaymentEvent
} from "../generated/Jodobix/Jodobix"
import {
  BetPlaced,
  EndOfBettingPeriod,
  GameCreated,
  PrizePayment
} from "../generated/schema"

export function handleBetPlaced(event: BetPlacedEvent): void {
  let entity = new BetPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.bettor = event.params.bettor
  entity.number = event.params.number
  entity.value = event.params.value
  entity.timestamp = event.params.timestamp
  entity.betId = event.params.betId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEndOfBettingPeriod(event: EndOfBettingPeriodEvent): void {
  let entity = new EndOfBettingPeriod(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.drawnNumber = event.params.drawnNumber
  entity.closer = event.params.closer
  entity.reward = event.params.reward
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameCreated(event: GameCreatedEvent): void {
  let entity = new GameCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.creator = event.params.creator
  entity.isPrivate = event.params.isPrivate
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePrizePayment(event: PrizePaymentEvent): void {
  let entity = new PrizePayment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.betId = event.params.betId
  entity.bettor = event.params.bettor
  entity.requestedBy = event.params.requestedBy
  entity.drawnNumber = event.params.drawnNumber
  entity.prizeValue = event.params.prizeValue
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
