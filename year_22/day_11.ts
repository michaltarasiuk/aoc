/* eslint-disable @typescript-eslint/no-unused-vars -- `old` is used by eval */
import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {z} from 'zod';

const input = await readInput({year: 2022, day: 11});

const monkeyRe = new RegExp(`\
Monkey (?<id>\\d):
  Starting items: (?<items>.*)
  Operation: new = (?<operation>.*)
  Test: divisible by (?<divider>\\d+)
    If true: throw to monkey (?<throwToIfDivisible>\\d+)
    If false: throw to monkey (?<throwToIfIndivisible>\\d+)`);

const MonkeySchema = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(items => items.split(', ').map(Number)),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwToIfDivisible: z.string().transform(Number),
  throwToIfIndivisible: z.string().transform(Number),
  inspects: z.number().default(0),
});
const MonkeyWithInspection = MonkeySchema.transform(m => ({
  ...m,
  inspect(this: typeof m, old: number) {
    this.inspects++;
    return Math.floor(eval(this.operation) / 3);
  },
}));

const RoundsCount = 20;
const monkeys = new Map(
  input
    .split('\n\n')
    .map(m => MonkeyWithInspection.parse(monkeyRe.exec(m)?.groups))
    .map(m => [m.id, m])
);

for (let i = 0; i < RoundsCount; i++) {
  for (const m of monkeys.values()) {
    const {divisible = [], indivisible = []} = Object.groupBy(
      m.items.splice(0).map(old => m.inspect(old)),
      item => (item % m.divider === 0 ? 'divisible' : 'indivisible')
    );
    monkeys.get(m.throwToIfDivisible)?.items.push(...divisible);
    monkeys.get(m.throwToIfIndivisible)?.items.push(...indivisible);
  }
}

const [a, b] = monkeys
  .values()
  .toArray()
  .sort((a, b) => b.inspects - a.inspects);
const businessLevel = a.inspects * b.inspects;

assert.strictEqual(businessLevel, 55458, 'Part 1 failed');
