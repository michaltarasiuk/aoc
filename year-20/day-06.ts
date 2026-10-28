import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const groups = input.split("\n\n").map(p => p.split("\n").map(l => [...l]))

const questionsCount = groups.map(g => new Set(g.flat()).size).reduce((a, b) => a + b)

const questionsCount2 = groups
  .map(g => g.reduce((acc, answers) => [...new Set(acc).intersection(new Set(answers))]).length)
  .reduce((a, b) => a + b)

assert.strictEqual(questionsCount, 6310, "Part 1 failed")
assert.strictEqual(questionsCount2, 3193, "Part 2 failed")
