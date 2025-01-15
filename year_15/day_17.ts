import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 17});

function* permuteContainers(
  liters: number,
  ...containers: number[]
): Generator<number[]> {
  for (const [i, container] of containers.entries()) {
    if (container === liters) {
      yield [container];
    } else {
      for (const permuted of permuteContainers(
        liters - container,
        ...containers.slice(i + 1)
      )) {
        yield [container, ...permuted];
      }
    }
  }
}

const Liters = 150;
const combinations = [...permuteContainers(Liters, ...lines.map(Number))];

assert.strictEqual(combinations.length, 1304, 'Part 1 failed');
