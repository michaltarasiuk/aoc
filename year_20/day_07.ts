import {getInputLines} from 'lib/input';

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

function buildBagGraph(rules: string[]) {
  const holders = new Map(
    rules.map((line) => {
      const [holder, ...bags] = parseRule(line);
      return [holder.color, bags];
    }),
  );

  const contains = (searchBag: string, ...bags: Bag[]): boolean => {
    return bags.some(
      (bag) =>
        bag.color === searchBag ||
        contains(searchBag, ...(holders.get(bag.color) ?? [])),
    );
  };

  return {
    countBagsWith(searchBag: string) {
      let count = 0;

      for (const bags of holders.values()) {
        if (contains(searchBag, ...bags)) count++;
      }
      return count;
    },
    countBagsOf(searchBag: string) {
      let count = 0;

      for (const bag of holders.get(searchBag) ?? []) {
        count += bag.count + bag.count * this.countBagsOf(bag.color);
      }
      return count;
    },
  };
}

const bagGraph = buildBagGraph(lines);

const bagsWithShinyGoldCount = bagGraph.countBagsWith('shiny gold');
const bagsOfShinyGoldCount = bagGraph.countBagsOf('shiny gold');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
