import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2020, day: 7});

type Rule = ReturnType<typeof parseRule>;
type Bag = Rule[number];

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other\b)\w+ \w+\b) bags?/g;

  return Array.from(rule.matchAll(bagsRe), ([, count, color]) => ({
    color,
    count: Number(count),
  }));
}

const holders = new Map(
  lines.map((line) => {
    const [holder, ...bags] = parseRule(line);
    return [holder.color, bags];
  }),
);

const containsAtLeastOne = (searchBag: string, ...bags: Bag[]): boolean => {
  return bags.some(
    (bag) =>
      bag.color === searchBag ||
      containsAtLeastOne(searchBag, ...(holders.get(bag.color) ?? [])),
  );
};

function countBagsOf(searchBag: string): number {
  const counts = Array.from(
    holders.get(searchBag) ?? [],
    (bag) => bag.count + bag.count * countBagsOf(bag.color),
  );
  return sum(...counts);
}

const SEARCH_BAG = 'shiny gold';

const bagsWithShinyGoldCount = sum(
  ...Array.from(holders.values(), (bags) =>
    Number(containsAtLeastOne(SEARCH_BAG, ...bags)),
  ),
);
const bagsOfShinyGoldCount = countBagsOf(SEARCH_BAG);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
