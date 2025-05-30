import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BetPlaced } from "../generated/schema"
import { BetPlaced as BetPlacedEvent } from "../generated/Critter/Critter"
import { handleBetPlaced } from "../src/critter"
import { createBetPlacedEvent } from "./critter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let gameId = BigInt.fromI32(234)
    let bettor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let number = 123
    let value = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let betId = BigInt.fromI32(234)
    let newBetPlacedEvent = createBetPlacedEvent(
      gameId,
      bettor,
      number,
      value,
      timestamp,
      betId
    )
    handleBetPlaced(newBetPlacedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("BetPlaced created and stored", () => {
    assert.entityCount("BetPlaced", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gameId",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bettor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "number",
      "123"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "BetPlaced",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "betId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
