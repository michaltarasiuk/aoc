import assert from "node:assert"
import crypto from "node:crypto"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function md5(data: crypto.BinaryLike) {
  return crypto.createHash("md5").update(data).digest("hex")
}
function findHash(prefix: string, zeroes: number, start = 0) {
  let n = start
  while (!md5(prefix + n).startsWith("0".repeat(zeroes))) n++
  return n
}

const coin = findHash(input, 5)
const coin2 = findHash(input, 6, coin)

assert.strictEqual(coin, 346386, "Part 1 failed")
assert.strictEqual(coin2, 9958218, "Part 2 failed")
