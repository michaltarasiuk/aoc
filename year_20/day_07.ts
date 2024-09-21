import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2020, day: 7});

type Rule = ReturnType<typeof parseRule>;
type Bag = Rule[number];

function parseRule(rule: string) {
  const bagsRe = /(?:(\d+) )?(\b(?!no other)\w+ \w+) bags?/g;

  return Array.from(rule.matchAll(bagsRe), ([, count, color]) => ({
    color,
    count: Number(count),
  }));
}

class Rules {
  #rules: Map<string, Bag[]>;
  constructor(rules: Rule[]) {
    this.#rules = new Map(rules.map(([{color}, ...bags]) => [color, bags]));
  }

  #includesBag(holder: string, search: string): boolean {
    const bags = this.#rules.get(holder) ?? [];
    return bags.some(
      bag => bag.color === search || this.#includesBag(bag.color, search)
    );
  }
  countBagsWith(search: string) {
    return sum(
      ...Array.from(this.#rules.keys(), holder =>
        Number(this.#includesBag(holder, search))
      )
    );
  }

  countBagsOf(search: string): number {
    return sum(
      ...Array.from(
        this.#rules.get(search) ?? [],
        bag => bag.count + bag.count * this.countBagsOf(bag.color)
      )
    );
  }
}

const SEARCH_BAG = 'shiny gold';

const rules = new Rules(lines.map(parseRule));

const bagsWithShinyGoldCount = rules.countBagsWith(SEARCH_BAG);
const bagsOfShinyGoldCount = rules.countBagsOf(SEARCH_BAG);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bagsWithShinyGoldCount).toBe(242);
  });

  test('part 2', () => {
    expect(bagsOfShinyGoldCount).toBe(176035);
  });
}
