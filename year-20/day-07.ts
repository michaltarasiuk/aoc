import assert from "node:assert"

import {fetchInput} from "../lib.ts"

const input = await fetchInput(import.meta)

type Rules = typeof rules

const SEARCH_BAG = "shiny gold"

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other)\w+ \w+) bags?/g
  return rule.matchAll(bagsRe).map(([, count, color]) => ({color, count: Number(count)}))
}

function includesBag(rules: Rules, holder: string, search: string): boolean {
  return (rules.get(holder) ?? []).some(
    bag => bag.color === search || includesBag(rules, bag.color, search),
  )
}

function countBagsOf(rules: Rules, search: string): number {
  return (rules.get(search) ?? [])
    .map(({color, count}) => count + count * countBagsOf(rules, color))
    .reduce((acc, count) => acc + count, 0)
}

const rules = new Map(
  input
    .split("\n")
    .map(parseRule)
    .map(([{color}, ...bags]) => [color, bags]),
)
const bagsWithShinyGoldCount = rules
  .keys()
  .map(holder => includesBag(rules, holder, SEARCH_BAG))
  .reduce((acc, has) => acc + Number(has), 0)

assert.strictEqual(bagsWithShinyGoldCount, 242, "Part 1 failed")
assert.strictEqual(countBagsOf(rules, SEARCH_BAG), 176035, "Part 2 failed")
