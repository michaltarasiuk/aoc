import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const MOVES = {R: [1, 0], L: [-1, 0], U: [0, 1], D: [0, -1]} as const

function parseWirePath(path: string) {
  return path.matchAll(/([RLUD])(\d+)/g).map(([, dir, distance]) => {
    return [dir as keyof typeof MOVES, Number(distance)] as const
  })
}

function traceWirePath(path: ReturnType<typeof parseWirePath>) {
  const visitedCoords = new Map<string, number>()
  let [x, y, steps] = [0, 0, 0]
  for (const [dir, distance] of path) {
    const [dx, dy] = MOVES[dir]
    for (let i = 0; i < distance; i++, steps++) {
      x += dx
      y += dy
      if (!visitedCoords.has(`${x},${y}`)) {
        visitedCoords.set(`${x},${y}`, steps + 1)
      }
    }
  }
  return visitedCoords
}

const [wire1Coords, wire2Coords] = input.split("\n").map(parseWirePath).map(traceWirePath)

const intersections = [...wire1Coords.keys()].filter(p => wire2Coords.has(p))

const manhattanDistances = intersections
  .map(p => p.split(",").map(Number))
  .map(([x, y]) => Math.abs(x) + Math.abs(y))

const totalSteps = intersections.map(p => wire1Coords.get(p)! + wire2Coords.get(p)!)

assert.strictEqual(Math.min(...manhattanDistances), 2427, "Part 1 failed")
assert.strictEqual(Math.min(...totalSteps), 27890, "Part 2 failed")
