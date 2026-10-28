import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function createPosition() {
  let x = 0
  let y = 0
  return {
    toString() {
      return `${x},${y}`
    },
    move(direction: string) {
      x += direction === ">" ? 1 : direction === "<" ? -1 : 0
      y += direction === "^" ? 1 : direction === "v" ? -1 : 0
      return this
    },
  }
}

const santa = createPosition()
const visitedHouses = new Set([...input].map(d => String(santa.move(d))))

const santas = [createPosition(), createPosition()]
const visitedHousesWithRoboSanta = new Set([...input].map((d, i) => String(santas[i % 2].move(d))))

assert.strictEqual(visitedHouses.size, 2565, "Part 1 failed")
assert.strictEqual(visitedHousesWithRoboSanta.size, 2639, "Part 2 failed")
