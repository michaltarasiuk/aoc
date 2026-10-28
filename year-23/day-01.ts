import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

const digitRe = /\d/
const lastDigitRe = new RegExp(`.*(${digitRe.source})`)

const spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/
const SPELLED_DIGITS = new Map(
  spelledDigitRe.source.split("|").map((spelled, i) => [spelled, i + 1]),
)

const digitOrSpelledRe = new RegExp(`${digitRe.source}|${spelledDigitRe.source}`)
const lastDigitOrSpelledRe = new RegExp(`.*(${digitOrSpelledRe.source})`)

const lines = input.split("\n")

const calibrationValuesSum = lines
  .map(l => {
    const [first = raise("Invalid digit")] = l.match(digitRe) ?? []
    const [, last = first] = l.match(lastDigitRe) ?? []

    return Number(first + last)
  })
  .reduce((a, b) => a + b)

const calibrationValuesSum2 = lines
  .map(l => {
    const [first = raise("Invalid digit")] = l.match(digitOrSpelledRe) ?? []
    const [, last = first] = l.match(lastDigitOrSpelledRe) ?? []

    return Number([first, last].map(digit => SPELLED_DIGITS.get(digit) ?? Number(digit)).join(""))
  })
  .reduce((a, b) => a + b)

assert.strictEqual(calibrationValuesSum, 55621, "Part 1 failed")
assert.strictEqual(calibrationValuesSum2, 53592, "Part 2 failed")
