import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2020, day: 7});

type Rules = Map<string, {color: string; count: number}[]>;

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

function countBagsWith(rules: Rules, search: string) {
  return rules
    .keys()
    .map(holder => includesBag(rules, holder, search))
    .reduce((acc, has) => acc + Number(has), 0);
}

function countBagsOf(rules: Rules, search: string): number {
  return (rules.get(search) ?? [])
    .map(({color, count}) => count + count * countBagsOf(rules, color))
    .reduce((acc, count) => acc + count, 0);
}

const rules = new Map(
  lines.map(parseRule).map(([{color}, ...bags]) => [color, bags])
);

const SearchBag = 'shiny gold';
const bagsWithShinyGoldCount = countBagsWith(rules, SearchBag);
const bagsOfShinyGoldCount = countBagsOf(rules, SearchBag);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
