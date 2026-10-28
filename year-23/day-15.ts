import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const MULTIPLIER = 17
const MODULO = 256

let hashSum = 0
for (const step of input.split(",")) {
  let charSum = 0
  for (const char of step) {
    charSum += char.charCodeAt(0)
    charSum *= MULTIPLIER
    charSum %= MODULO
  }
  hashSum += charSum
}

assert.strictEqual(hashSum, 505459, "Part 1 failed")
