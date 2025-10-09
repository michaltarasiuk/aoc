import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 17});

function* permuteContainers(
  liters: number,
  ...containers: number[]
): Generator<number[]> {
  for (const [i, c] of containers.entries()) {
    if (c === liters) {
      yield [c];
    } else {
      for (const permuted of permuteContainers(
        liters - c,
        ...containers.slice(i + 1)
      )) {
        yield [c, ...permuted];
      }
    }
  }
}

const Liters = 150;

const lines = input.split(/\n/);
const combinations = [...permuteContainers(Liters, ...lines.map(Number))];

const combinationsByLength = Object.groupBy(combinations, c => c.length);
const containerCounts = Object.keys(combinationsByLength).map(Number);

assert.strictEqual(combinations.length, 1304, 'Part 1 failed');
assert.strictEqual(
  combinationsByLength[Math.min(...containerCounts)]?.length,
  18,
  'Part 2 failed'
);
