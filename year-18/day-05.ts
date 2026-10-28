import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function reactPolymer(polymer: string) {
  const reactionRe = /(\w)(\1)/gi

  let exec: RegExpExecArray | null
  let units = polymer
  while ((exec = reactionRe.exec(units))) {
    const [m, a, b] = exec
    if (a !== b) {
      units = units.replace(m, "")
      reactionRe.lastIndex = 0
    } else {
      reactionRe.lastIndex--
    }
  }
  return units
}

const reactedPolymer = reactPolymer(input)
const polymerLengths = [..."abcdefghijklmnopqrstuvwxyz"].map(
  unit => reactPolymer(input.replace(new RegExp(unit, "gi"), "")).length,
)
const minPolymerLength = Math.min(...polymerLengths)

assert.strictEqual(reactedPolymer.length, 10972, "Part 1 failed")
assert.strictEqual(minPolymerLength, 5278, "Part 2 failed")
