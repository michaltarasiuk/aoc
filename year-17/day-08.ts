import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

function parseInstruction(i: string) {
  const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (\w+) ([!<>=]=?) (-?\d+)$/
  const [, register, operation, value, condReg, condOp, condVal] =
    instructionRe.exec(i) ?? raise("Invalid instruction")
  return {
    register,
    operation,
    value,
    condition: {register: condReg, operation: condOp, value: condVal},
  }
}

const registers: Record<string, number> = {}
let maxEverSeen = -Infinity
for (const l of input.split("\n")) {
  const {register, operation, value, condition} = parseInstruction(l)
  if (!eval(`${(registers[condition.register] ??= 0)} ${condition.operation} ${condition.value}`)) {
    continue
  }
  registers[register] ??= 0
  registers[register] += operation === "inc" ? Number(value) : -Number(value)
  maxEverSeen = Math.max(maxEverSeen, registers[register])
}

const maxFinal = Math.max(...Object.values(registers))

assert.strictEqual(maxFinal, 5966, "Part 1 failed")
assert.strictEqual(maxEverSeen, 6347, "Part 2 failed")
