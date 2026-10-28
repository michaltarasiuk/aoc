import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function findMarkerEndIndex(s: string, markerLength: number) {
  const index = [...s].findIndex((_, i) => {
    return new Set(s.slice(i, i + markerLength)).size === markerLength
  })
  return index === -1 ? -1 : index + markerLength
}

assert.strictEqual(findMarkerEndIndex(input, 4), 1343, "Part 1 failed")
assert.strictEqual(findMarkerEndIndex(input, 14), 2193, "Part 2 failed")
