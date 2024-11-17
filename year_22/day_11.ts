import {getInput} from 'lib/input.js';
import {parseNumbers} from 'lib/parse.js';
import {z} from 'zod';

const input = await getInput({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwToIfDivisble>\\d+)
    If false: throw to monkey (?<throwToIfIndivisible>\\d+)`);

const MonkeySchema = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(items => parseNumbers(items)),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwToIfDivisble: z.string().transform(Number),
  throwToIfIndivisible: z.string().transform(Number),
});

function parseMonkey(monkey: string) {
  return {
    inspects: 0,
    inspect(old: number) {
      this.inspects++;
      return Math.floor(eval(this.operation) / 3);
    },
    ...MonkeySchema.parse(monkey.match(monkeyRe)?.groups),
  };
}

const RoundsCount = 20;
const monkeys = new Map(
  input
    .split('\n\n')
    .map(parseMonkey)
    .map(monkey => [monkey.id, monkey])
);

for (let i = 0; i < RoundsCount; i++) {
  for (const monkey of monkeys.values()) {
    const items = monkey.items.splice(0).map(old => monkey.inspect(old));
    const {divisible = [], indivisible = []} = Object.groupBy(items, item =>
      item % monkey.divider === 0 ? 'divisible' : 'indivisible'
    );
    monkeys.get(monkey.throwToIfDivisble)?.items.push(...divisible);
    monkeys.get(monkey.throwToIfIndivisible)?.items.push(...indivisible);
  }
}

const [a, b] = monkeys
  .values()
  .toArray()
  .toSorted((a, b) => b.inspects - a.inspects);
const businessLevel = a.inspects * b.inspects;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(businessLevel).toBe(55458));
}
