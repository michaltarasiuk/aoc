import assert from "node:assert"

import {divisors, fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const PRESENTS_PER_HOUSE = 10

let houseNumber = 1
while (true) {
  const housePresents = divisors(houseNumber).reduce(
    (sum, elf) => sum + elf * PRESENTS_PER_HOUSE,
    0,
  )
  if (housePresents >= Number(input)) {
    break
  }
  houseNumber++
}

assert.strictEqual(houseNumber, 665280, "Part 1 failed")
