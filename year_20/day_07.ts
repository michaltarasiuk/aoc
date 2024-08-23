import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2020, day: 7});

type Bag = ReturnType<typeof parseRule>[number];

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
  };
}

const count = buildBagGraph(lines).countBagsWith('shiny gold');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(count).toBe(242);
  });
}
