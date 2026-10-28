import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

type Instruction = {op: "addx"; arg: number} | {op: "noop"}

const CYCLES = [20, 60, 100, 140, 180, 220]

function parseInstruction(line: string): Instruction {
  const [op, arg] = line.split(/\s/)
  return op === "addx" ? {op, arg: Number(arg)} : {op: "noop"}
}

function calcSignal(instructions: Instruction[]) {
  return instructions.reduce((acc, i) => (i.op === "addx" ? acc + i.arg : acc), 1)
}

const instructions: Instruction[] = input
  .split("\n")
  .map(parseInstruction)
  .flatMap(i => (i.op === "addx" ? [{op: "noop"} as const, i] : [i]))

const sumOfSignals = CYCLES.reduce(
  (acc, c) => acc + c * calcSignal(instructions.slice(0, c - 1)),
  0,
)

assert.strictEqual(sumOfSignals, 14540, "Part 1 failed")
