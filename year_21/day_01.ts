import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2021, day: 1});

function countIncreases(measurements: number[], windowSize: number) {
  return measurements.reduce((acc, depth, i) => {
    if (i >= windowSize && depth > measurements[i - windowSize]) {
      acc++;
    }
    return acc;
  }, 0);
}

const depths = (input.match(/\d+/g) ?? []).map(Number);

assert.strictEqual(countIncreases(depths, 1), 1559, 'Part 1 failed');
assert.strictEqual(countIncreases(depths, 3), 1600, 'Part 2 failed');
