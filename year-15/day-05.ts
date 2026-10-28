import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const lines = input.split("\n")

const niceStringsCount = lines.filter(l => {
  return /(.*[aeuio].*){3}/.test(l) && /(\w)\1/.test(l) && !/ab|cd|pq|xy/.test(l)
}).length

const niceStringsCount2 = lines.filter(l => {
  return /(\w{2}).*\1/.test(l) && /(\w)\w\1/.test(l)
}).length

assert.strictEqual(niceStringsCount, 238, "Part 1 failed")
assert.strictEqual(niceStringsCount2, 69, "Part 2 failed")
