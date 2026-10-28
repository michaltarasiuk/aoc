import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function calcPaper(l: number, w: number, h: number) {
  const [lw, wh, hl] = [l * w, w * h, h * l]
  return 2 * (lw + wh + hl) + Math.min(lw, wh, hl)
}
function calcRibbon(l: number, w: number, h: number) {
  return 2 * Math.min(l + w, w + h, h + l) + l * w * h
}

let paper = 0
let ribbon = 0
for (const ln of input.split("\n")) {
  const [l, w, h] = ln.split("x").map(Number)
  paper += calcPaper(l, w, h)
  ribbon += calcRibbon(l, w, h)
}

assert.strictEqual(paper, 1598415, "Part 1 failed")
assert.strictEqual(ribbon, 3812909, "Part 2 failed")
