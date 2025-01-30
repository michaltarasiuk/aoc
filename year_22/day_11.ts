import assert from 'node:assert';

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

const MonkeySchema = z.object({
  id: z.string().transform(Number),
  items: z.string().transform(items => extractInts(items)),
  operation: z.string(),
  divider: z.string().transform(Number),
  throwToIfDivisble: z.string().transform(Number),
  throwToIfIndivisible: z.string().transform(Number),
});

function inspect(this: {inspects: number; operation: string}, old: number) {
  this.inspects++;
  return Math.floor(eval(this.operation) / 3);
}

const RoundsCount = 20;
const monkeys = new Map(
  input
    .split('\n\n')
    .map(m => ({
      inspects: 0,
      inspect,
      ...MonkeySchema.parse(monkeyRe.exec(m)?.groups),
    }))
    .map(m => [m.id, m])
);

for (let i = 0; i < RoundsCount; i++) {
  for (const m of monkeys.values()) {
    const items = m.items.splice(0).map(old => m.inspect(old));
    const {divisible = [], indivisible = []} = Object.groupBy(items, item =>
      item % m.divider === 0 ? 'divisible' : 'indivisible'
    );
    monkeys.get(m.throwToIfDivisble)?.items.push(...divisible);
    monkeys.get(m.throwToIfIndivisible)?.items.push(...indivisible);
  }
}

const [a, b] = monkeys
  .values()
  .toArray()
  .sort((a, b) => b.inspects - a.inspects);
const businessLevel = a.inspects * b.inspects;

assert.strictEqual(businessLevel, 55458, 'Part 1 failed');
