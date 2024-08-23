import {getInputLines} from 'lib/input';
import {isDefined} from 'lib/is_defined';

const lines = await getInputLines({year: 2020, day: 7});

type Bag = ReturnType<typeof parseRule>[number];

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other\b)\w+ \w+\b) bags?/g;

  return Array.from(rule.matchAll(bagsRe), ([, count, color]) => ({
    color,
    get count() {
      if (!isDefined(count)) {
        throw new Error('No count');
      }
      return Number(count);
    },
  }));
}

class Holders {
  #holders = new Map<string, Bag[]>();

  constructor(rules: string[]) {
    this.#holders = new Map(
      rules.map((line) => {
        const [holder, ...bags] = parseRule(line);
        return [holder.color, bags] as const;
      }),
    );
  }

  #containAtLeastOne(searchBag: string, bags: Bag[]): boolean {
    return bags.some(
      (bag) =>
        bag.color === searchBag ||
        this.#containAtLeastOne(searchBag, this.#holders.get(bag.color) ?? []),
    );
  }

  countBagsWith(searchBag: string) {
    let count = 0;

    for (const bags of this.#holders.values()) {
      if (this.#containAtLeastOne(searchBag, bags)) {
        count++;
      }
    }
    return count;
  }
}

const count = new Holders(lines).countBagsWith('shiny gold');

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(count).toBe(242);
  });
}
