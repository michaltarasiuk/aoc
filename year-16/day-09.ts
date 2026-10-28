import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

const markerRe = /\((\d+)x(\d+)\)/g

let decompressed = input
let exec: RegExpExecArray | null = null
while ((exec = markerRe.exec(decompressed))) {
  const {0: match, index} = exec
  const length = Number(exec[1])
  const repeatCount = Number(exec[2])

  const marked = decompressed.slice(index + match.length, index + match.length + length)

  decompressed = [...decompressed]
    .toSpliced(index, match.length + length, marked.repeat(repeatCount))
    .join("")
  markerRe.lastIndex = index + marked.length * repeatCount
}

assert.strictEqual(decompressed.length, 107035, "Part 1 failed")
