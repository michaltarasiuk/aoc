import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2020, day: 7});

type Rules = typeof rules;

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other)\w+ \w+) bags?/g;
  return rule
    .matchAll(bagsRe)
    .map(([, count, color]) => ({color, count: Number(count)}));
}

function includesBag(rules: Rules, holder: string, search: string): boolean {
  return (rules.get(holder) ?? []).some(
    bag => bag.color === search || includesBag(rules, bag.color, search)
  );
}

function countBagsOf(rules: Rules, search: string): number {
  return (rules.get(search) ?? [])
    .map(({color, count}) => count + count * countBagsOf(rules, color))
    .reduce((acc, count) => acc + count, 0);
}

const SearchBag = 'shiny gold';
const rules = new Map(
  input
    .split(/\n/)
    .map(parseRule)
    .map(([{color}, ...bags]) => [color, bags])
);
const bagsWithShinyGoldCount = rules
  .keys()
  .map(holder => includesBag(rules, holder, SearchBag))
  .reduce((acc, has) => acc + Number(has), 0);

assert.strictEqual(bagsWithShinyGoldCount, 242, 'Part 1 failed');
assert.strictEqual(countBagsOf(rules, SearchBag), 176035, 'Part 2 failed');
