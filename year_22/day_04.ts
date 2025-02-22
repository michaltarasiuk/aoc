import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2022, day: 4});

let fullyContainedPairsCount = 0;
for (const l of input.split('\n')) {
  const [a, b, c, d] = l.match(/\d+/g)!.map(Number);
  if ((a <= c && b >= d) || (c <= a && d >= b)) {
    fullyContainedPairsCount++;
  }
}

assert.strictEqual(fullyContainedPairsCount, 532, 'Part 1 failed');
