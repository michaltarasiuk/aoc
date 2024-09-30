import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2020, day: 7});

type Rule = ReturnType<typeof parseRule>;
type Rules = Map<string, Rule>;

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other)\w+ \w+) bags?/g;

  return Array.from(rule.matchAll(bagsRe), ([, count, color]) => ({
    color,
    count: Number(count),
  }));
}

function includesBag(rules: Rules, holder: string, search: string): boolean {
  const bags = rules.get(holder) ?? [];
  return bags.some(
    bag => bag.color === search || includesBag(rules, bag.color, search)
  );
}

function countBagsWith(rules: Rules, search: string) {
  return sum(
    ...Array.from(rules.keys(), holder =>
      Number(includesBag(rules, holder, search))
    )
  );
}

function countBagsOf(rules: Rules, search: string): number {
  return sum(
    ...Array.from(
      rules.get(search) ?? [],
      bag => bag.count + bag.count * countBagsOf(rules, bag.color)
    )
  );
}

const rules = new Map(
  lines.map(parseRule).map(([{color}, ...bags]) => [color, bags])
);

const SEARCH_BAG = 'shiny gold';
const bagsWithShinyGoldCount = countBagsWith(rules, SEARCH_BAG);
const bagsOfShinyGoldCount = countBagsOf(rules, SEARCH_BAG);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
