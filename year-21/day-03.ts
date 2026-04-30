import assert from "node:assert"

import {fetchInput, frequencies, transpose} from "../lib.js"

const input = await fetchInput({year: 2021, day: 3})

const mostCommonBit = (bits: string[]) => {
  const freq = frequencies(bits)
  return freq.get("0")! > freq.get("1")! ? "0" : "1"
}

const toDecimal = (bits: string[]) => parseInt(bits.join(""), 2)

const binaryNumbers = input.split(/\n/).map(line => [...line])

const gammaRate = transpose(binaryNumbers).map(mostCommonBit)
const epsilonRate = gammaRate.map(bit => (bit === "0" ? "1" : "0"))

const powerConsumption = toDecimal(gammaRate) * toDecimal(epsilonRate)

assert.strictEqual(powerConsumption, 1025636, "Part 1 failed")
