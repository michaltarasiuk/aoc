import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2022, day: 4});

const fullyContainedPairsCount = input
  .split('\n')
  .map(l => (l.match(/\d+/g) ?? []).map(Number))
  .map(([a, b, c, d]) => Number((a <= c && b >= d) || (c <= a && d >= b)))
  .reduce((a, b) => a + b);

assert.strictEqual(fullyContainedPairsCount, 532, 'Part 1 failed');
