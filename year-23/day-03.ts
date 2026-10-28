import assert from "node:assert"

import {fetchInput, isDefined} from "../lib.ts"

const input = await fetchInput(import.meta)

type Layer = string[][]

const OFFSETS = [-1, 0, 1]
const PADDING = 1

function getRange(n: number, x: number) {
  return [Math.max(x - PADDING, 0), x + String(n).length + PADDING]
}

function extractSegments(lines: string[], y: number, x: number, n: number) {
  return OFFSETS.map(j => lines[y + j]?.slice(...getRange(n, x)))
}

function parseLayers(lines: string[]) {
  return lines.map((l, y) => {
    const matches = Array.from(l.matchAll(/\d+/g), m => [Number(m[0]), m.index] as const)
    return matches.map(([n, x]) => extractSegments(lines, y, x, n))
  })
}

function sumPartNumbers(layers: Layer[]) {
  const symbolRe = /[^\d.]/
  return layers.flat().reduce((acc, segments) => {
    if (segments.filter(isDefined).some(s => symbolRe.test(s))) {
      acc += Number(segments[1].replace(/\D/g, ""))
    }
    return acc
  }, 0)
}

const lines = input.split("\n")
const layers = parseLayers(lines)

const part1Result = sumPartNumbers(layers)

assert.strictEqual(part1Result, 531561, "Part 1 failed")
