import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const TIME = 100
const TILES_WIDE = 101
const TILES_TALL = 103

const HORIZONTAL_MIDDLE = Math.floor(TILES_WIDE / 2)
const VERTICAL_MIDDLE = Math.floor(TILES_TALL / 2)

const robotRe = /^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/
const robots = input.split("\n").map(l => {
  const [, px, py, vx, vy] = (robotRe.exec(l) ?? []).map(Number)
  return {px, py, vx, vy}
})

const positions = robots.map(({px, py, vx, vy}) => {
  const x = (px + vx * TIME) % TILES_WIDE
  const y = (py + vy * TIME) % TILES_TALL
  return {
    x: x < 0 ? x + TILES_WIDE : x,
    y: y < 0 ? y + TILES_TALL : y,
  }
})
const quadrants = Object.groupBy(positions, ({x, y}) => {
  if (x === HORIZONTAL_MIDDLE || y === VERTICAL_MIDDLE) return "middle"
  return `${x < HORIZONTAL_MIDDLE ? "left" : "right"}-${y < VERTICAL_MIDDLE ? "top" : "bottom"}`
})

const safetyFactor = Object.entries(quadrants)
  .filter(([k]) => k !== "middle")
  .reduce((acc, [, q]) => acc * q.length, 1)

assert.strictEqual(safetyFactor, 229839456, "Part 1 failed")
