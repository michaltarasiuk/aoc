import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

function parseVent(l: string) {
  const ventRe = /^(\d+),(\d+) -> (\d+),(\d+)$/
  const [, ...coords] = ventRe.exec(l) ?? raise("Invalid vent")
  let [x1, y1, x2, y2] = coords.map(Number)
  if (x1 > x2) [x1, x2] = [x2, x1]
  if (y1 > y2) [y1, y2] = [y2, y1]
  return {x1, y1, x2, y2}
}

const diagram: Record<string, number> = {}
for (const l of input.split("\n")) {
  const {x1, x2, y1, y2} = parseVent(l)
  if (x1 !== x2 && y1 !== y2) {
    continue
  }
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      diagram[`${x},${y}`] = (diagram[`${x},${y}`] ?? 0) + 1
    }
  }
}

const overlapCount = Object.values(diagram).filter(count => count >= 2).length

assert.strictEqual(overlapCount, 5294, "Part 1 failed")
