import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {extractIntegers} from 'lib/parse.js';

const lines = await getInputLines({year: 2022, day: 4});

const pairsFullyCoveredCount = sum(
  ...lines
    .map(l => extractIntegers(l, {negative: false}))
    .map(([a, b, a1, b2]) => (a <= a1 && b >= b2) || (a1 <= a && b2 >= b))
    .map(Number)
);

assert.strictEqual(pairsFullyCoveredCount, 532, 'Part 1 failed');
