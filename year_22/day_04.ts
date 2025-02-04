import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2022, day: 4});

const fullyContainedPairsCount = input
  .split('\n')
  .map(l => {
    const [a, b, c, d] = (l.match(/\d+/g) ?? []).map(Number);
    return (a <= c && b >= d) || (c <= a && d >= b);
  })
  .reduce((acc, cond) => acc + Number(cond), 0);

assert.strictEqual(fullyContainedPairsCount, 532, 'Part 1 failed');
