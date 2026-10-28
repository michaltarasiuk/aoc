import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function findMaxJoltage(bank: number[], len: number) {
  let joltage = ""
  let start = 0
  while (len--) {
    const batteries = bank.slice(start, bank.length - len)
    const maxBattery = Math.max(...batteries)
    joltage += maxBattery
    start += batteries.indexOf(maxBattery) + 1
  }
  return Number(joltage)
}

const banks = input.split("\n").map(b => [...b].map(Number))

const totalJoltage = banks.map(b => findMaxJoltage(b, 2)).reduce((a, b) => a + b, 0)

const totalJoltageWithTwelveBatteries = banks
  .map(b => findMaxJoltage(b, 12))
  .reduce((a, b) => a + b, 0)

assert.strictEqual(totalJoltage, 17095, "Part 1 failed")
assert.strictEqual(totalJoltageWithTwelveBatteries, 168794698570517, "Part 2 failed")
