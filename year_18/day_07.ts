import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await getInput({year: 2018, day: 7});

function parseStep(step: string) {
  const stepRe = /^Step (\w) must be finished before step (\w) can begin.$/;
  const [, before, after] = stepRe.exec(step) ?? raise('Invalid step');

  return {before, after};
}

const steps = input
  .split(/\n/)
  .map(parseStep)
  .reduce<Map<string, Set<string>>>((acc, {before, after}) => {
    if (!acc.has(before)) acc.set(before, new Set());
    if (!acc.has(after)) acc.set(after, new Set());

    acc.get(after)!.add(before);
    return acc;
  }, new Map());

const order: string[] = [];
while (steps.size > 0) {
  const [step] = steps
    .keys()
    .filter(k => steps.get(k)?.isSubsetOf(new Set(order)))
    .toArray()
    .sort();

  steps.delete(step);
  order.push(step);
}

assert.strictEqual(
  order.join(''),
  'JDEKPFABTUHOQSXVYMLZCNIGRW',
  'Part 1 failed'
);
