import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

const INITIAL_CODE = 20_151_125
const MULTIPLIER = 252_533
const MODULO = 33_554_393

const inputRe = /Enter the code at row (\d+), column (\d+)/
const inputMatch = input.match(inputRe) ?? raise("Invalid input")

const row = Number(inputMatch[1])
const col = Number(inputMatch[2])

let code = INITIAL_CODE
for (let i = 0; i < ((row + col) * (row + col - 1)) / 2 - row; i++) {
  code = (code * MULTIPLIER) % MODULO
}

assert.strictEqual(code, 9132360, "Part 1 failed")
