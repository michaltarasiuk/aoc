import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function countIncreases(measurements: number[], windowSize: number) {
  return measurements.reduce((acc, depth, i) => {
    if (i >= windowSize && depth > measurements[i - windowSize]) {
      acc++
    }
    return acc
  }, 0)
}

const depths = input.matchAll(/\d+/g).map(Number).toArray()

assert.strictEqual(countIncreases(depths, 1), 1559, "Part 1 failed")
assert.strictEqual(countIncreases(depths, 3), 1600, "Part 2 failed")
