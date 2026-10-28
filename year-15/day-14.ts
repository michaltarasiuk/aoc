import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const RACE_DURATION = 2_503

function parseReindeer(r: string) {
  return Array.from(r.matchAll(/\d+/g), Number) as [number, number, number]
}

function calcDistance(speed: number, duration: number, rest: number) {
  let time = 0
  let distance = 0
  while (time < RACE_DURATION) {
    for (let i = 0; i < duration && time < RACE_DURATION; i++, time++) {
      distance += speed
    }
    time += rest
  }
  return distance
}

const distances = input
  .split("\n")
  .map(parseReindeer)
  .map(r => calcDistance(...r))

assert.strictEqual(Math.max(...distances), 2640, "Part 1 failed")
