import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function countTotalCards(cards: Map<number, Set<number>>, ids = cards.keys().toArray()): number {
  return ids.reduce((acc, id) => {
    const matchCount = cards.get(id)?.size ?? 0
    const won = Array.from({length: matchCount}, (_, i) => id + 1 + i)
    return acc + countTotalCards(cards, won)
  }, ids.length)
}

const cards = new Map(
  input.split("\n").map(l => {
    const [[id, ...a], b] = l.split("|").map(l => Array.from(l.matchAll(/\d+/g), Number))
    return [id, new Set(a).intersection(new Set(b))] as const
  }),
)

const points = cards.values().reduce((acc, matches) => {
  if (matches.size) {
    acc += Math.pow(2, matches.size - 1)
  }
  return acc
}, 0)
const totalCardsCount = countTotalCards(cards)

assert.strictEqual(points, 26218, "Part 1 failed")
assert.strictEqual(totalCardsCount, 9997537, "Part 2 failed")
