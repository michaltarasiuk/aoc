import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

function parseInstruction(instruction: string) {
  return [...(instruction.match(/[A-Z]+/) ?? []), ...(instruction.match(/([a-z]|[0-9])+/g) ?? [])]
}

const circuit: Record<string, string[]> = {}
for (const l of input.split("\n")) {
  const parts = parseInstruction(l)
  const dest = parts.pop()!
  circuit[dest] = parts
}

function calcSignalOrParse(s: string, cache: Map<string, number>) {
  const parsed = Number(s)
  if (Number.isNaN(parsed)) {
    return cache.get(s) ?? cache.set(s, calcSignal(s, cache)).get(s)!
  }
  return parsed
}
function calcSignal(dest: string, cache = new Map<string, number>()): number {
  if (!(dest in circuit)) {
    throw new Error(`No destination for "${dest}"`)
  }
  const [gate, a, b] = circuit[dest]
  switch (gate) {
    case "AND":
      return calcSignalOrParse(a, cache) & calcSignalOrParse(b, cache)
    case "OR":
      return calcSignalOrParse(a, cache) | calcSignalOrParse(b, cache)
    case "LSHIFT":
      return calcSignalOrParse(a, cache) << calcSignalOrParse(b, cache)
    case "RSHIFT":
      return calcSignalOrParse(a, cache) >> calcSignalOrParse(b, cache)
    case "NOT":
      return ~calcSignalOrParse(a, cache)
    default:
      return calcSignalOrParse(gate, cache)
  }
}

const wireASignal = calcSignal("a")
const finalWireASignal = calcSignal("a", new Map([["b", wireASignal]]))

assert.strictEqual(wireASignal, 46065, "Part 1 failed")
assert.strictEqual(finalWireASignal, 14134, "Part 2 failed")
