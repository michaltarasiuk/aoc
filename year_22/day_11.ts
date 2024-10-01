import {getInput} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';
import {z} from 'zod';

const input = await getInput({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwToIfDivisble>\\d+)
    If false: throw to monkey (?<throwToIfIndivisible>\\d+)`);

const MONKEY_SCHEMA = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(extractInts),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwToIfDivisble: z.string().transform(Number),
  throwToIfIndivisible: z.string().transform(Number),
});

type Monkey = ReturnType<typeof parseMonkey>;

function parseMonkey(monkey: string) {
  const {groups} = monkey.match(monkeyRe) ?? {};
  return {inspects: 0, ...MONKEY_SCHEMA.parse(groups)};
}

function inspect(this: Monkey, old: number) {
  this.inspects++;
  return Math.floor(eval(this.operation) / 3);
}

function round(initial: Map<number, Monkey>) {
  const monkeys = structuredClone(initial);

  for (const monkey of monkeys.values()) {
    const items = monkey.items.splice(0).map(inspect, monkey);
    const {divisible = [], indivisible = []} = Object.groupBy(items, item =>
      item % monkey.divider === 0 ? 'divisible' : 'indivisible'
    );

    monkeys.get(monkey.throwToIfDivisble)?.items.push(...divisible);
    monkeys.get(monkey.throwToIfIndivisible)?.items.push(...indivisible);
  }
  return monkeys;
}

let monkeys = new Map(
  input
    .split('\n\n')
    .map(parseMonkey)
    .map(monkey => [monkey.id, monkey])
);

const ROUNDS_COUNT = 20;
for (let i = 0; i < ROUNDS_COUNT; i++) {
  monkeys = round(monkeys);
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
