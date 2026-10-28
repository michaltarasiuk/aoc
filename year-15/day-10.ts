import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function lookAndSay(s: string, times: number) {
  for (let i = 0; i < times; i++) {
    s = s
      .matchAll(/(\d)\1*/g)
      .map(m => m[0].length + m[1])
      .toArray()
      .join("")
  }
  return s
}

const after40 = lookAndSay(input, 40)
const after50 = lookAndSay(after40, 10)

assert.strictEqual(after40.length, 492982, "Part 1 failed")
assert.strictEqual(after50.length, 6989950, "Part 2 failed")
