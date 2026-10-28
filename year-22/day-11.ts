import assert from "node:assert"

import {fetchInput, raise} from "../lib.ts"

const input = await fetchInput(import.meta)

const ROUNDS_COUNT = 20

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwToIfDivisible>\\d+)
    If false: throw to monkey (?<throwToIfIndivisible>\\d+)`)

function parseMonkey(block: string) {
  const groups = monkeyRe.exec(block)?.groups ?? raise("Invalid monkey")
  return {
    id: Number(groups.id),
    items: groups.items.split(", ").map(Number),
    operation: groups.operation,
    divider: Number(groups.divider),
    throwToIfDivisible: Number(groups.throwToIfDivisible),
    throwToIfIndivisible: Number(groups.throwToIfIndivisible),
    inspects: 0,
    inspect(old: number) {
      this.inspects++
      return Math.floor(eval(this.operation) / 3)
    },
  }
}

const monkeys = new Map(
  input
    .split("\n\n")
    .map(parseMonkey)
    .map(m => [m.id, m]),
)

for (let i = 0; i < ROUNDS_COUNT; i++) {
  for (const m of monkeys.values()) {
    const {divisible = [], indivisible = []} = Object.groupBy(
      m.items.splice(0).map(old => m.inspect(old)),
      item => (item % m.divider === 0 ? "divisible" : "indivisible"),
    )
    monkeys.get(m.throwToIfDivisible)?.items.push(...divisible)
    monkeys.get(m.throwToIfIndivisible)?.items.push(...indivisible)
  }
}

const [a, b] = monkeys
  .values()
  .toArray()
  .sort((a, b) => b.inspects - a.inspects)
const businessLevel = a.inspects * b.inspects

assert.strictEqual(businessLevel, 55458, "Part 1 failed")
