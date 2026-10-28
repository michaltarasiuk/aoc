import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const nodes = input.split(" ").map(Number)

function add(a: number, b: number) {
  return a + b
}

let metadataEntriesSum = 0
let cursor = 0
function walk() {
  const childCount = nodes[cursor++]
  const metadataCount = nodes[cursor++]
  const children: number[] = []
  for (let i = 0; i < childCount; i++) {
    children.push(walk())
  }
  const metadataEntries = nodes.slice(cursor, cursor + metadataCount)
  metadataEntriesSum += metadataEntries.reduce(add, 0)
  cursor += metadataEntries.length

  return childCount === 0
    ? metadataEntries.reduce(add, 0)
    : metadataEntries.map(index => children[index - 1] ?? 0).reduce(add, 0)
}

const rootValue = walk()

assert.strictEqual(metadataEntriesSum, 41028, "Part 1 failed")
assert.strictEqual(rootValue, 20849, "Part 2 failed")
