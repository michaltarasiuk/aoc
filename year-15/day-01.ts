import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

let floor = 0
let basementEntryIdx: number | undefined
for (const [i, char] of Object.entries(input)) {
  floor += char === "(" ? 1 : -1
  if (floor === -1) basementEntryIdx ??= Number(i) + 1
}

assert.strictEqual(floor, 280, "Part 1 failed")
assert.strictEqual(basementEntryIdx, 1797, "Part 2 failed")
