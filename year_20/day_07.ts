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

function containsBag(
  searchBag: string,
  holderBag: string,
  holders: Map<string, Bag[]>,
): boolean {
  const bags = holders.get(holderBag) ?? [];
  return bags.some(
    (bag) =>
      bag.color === searchBag || containsBag(searchBag, bag.color, holders),
  );
}

function countBagsOf(searchBag: string, holders: Map<string, Bag[]>): number {
  const counts = Array.from(
    holders.get(searchBag) ?? [],
    (bag) => bag.count + bag.count * countBagsOf(bag.color, holders),
  );
  return sum(...counts);
}

const holders = new Map(
  lines.map((line) => {
    const [holder, ...bags] = parseRule(line);
    return [holder.color, bags];
  }),
);

const SEARCH_BAG = 'shiny gold';

const bagsWithShinyGoldCount = sum(
  ...Array.from(holders.keys(), (holder) =>
    Number(containsBag(SEARCH_BAG, holder, holders)),
  ),
);
const bagsOfShinyGoldCount = countBagsOf(SEARCH_BAG, holders);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
