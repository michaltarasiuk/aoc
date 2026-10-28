import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const expenses = input.split("\n").map(Number)

let productOfTwoEntries = 0
let productOfThreeEntries = 0
for (const a of expenses) {
  for (const b of expenses) {
    if (a + b === 2020) {
      productOfTwoEntries = a * b
    }
    for (const c of expenses) {
      if (a + b + c === 2020) {
        productOfThreeEntries = a * b * c
      }
    }
  }
}

assert.strictEqual(productOfTwoEntries, 482811, "Part 1 failed")
assert.strictEqual(productOfThreeEntries, 193171814, "Part 2 failed")
