import {getInputParagraphs} from 'lib/input';
import {matchInts} from 'lib/ints';
import {z} from 'zod';

const paragraphs = await getInputParagraphs({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwTo_true>\\d+)
    If false: throw to monkey (?<throwTo_false>\\d+)`);

const MONKEY_SCHEMA = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(matchInts),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwTo_true: z.string().transform(Number),
  throwTo_false: z.string().transform(Number),
});

function parseMonkey(paragraph: string[]) {
  const monkey = paragraph.join('\n').match(monkeyRe)?.groups;

  return {
    inspects: 0,
    inspect(old: number) {
      this.inspects++;
      return Math.floor(eval(this.operation) / 3);
    },
    ...MONKEY_SCHEMA.parse(monkey),
  };
}

const ROUNDS_COUNT = 20;
const monkeys = new Map(
  paragraphs.map(parseMonkey).map(monkey => [monkey.id, monkey])
);

for (let i = 0; i < ROUNDS_COUNT; i++) {
  for (const monkey of monkeys.values()) {
    for (const item of monkey.items.splice(0)) {
      const newItem = monkey.inspect(item);
      const divisible = newItem % monkey.divider === 0;

      monkeys.get(monkey[`throwTo_${divisible}`])?.items.push(newItem);
    }
  }
}

const [a, b] = Array.from(monkeys.values()).toSorted(
  (a, b) => b.inspects - a.inspects
);
const businessLevel = a.inspects * b.inspects;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(businessLevel).toBe(55458);
  });
}
