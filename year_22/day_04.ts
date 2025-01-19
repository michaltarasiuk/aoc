import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2022, day: 4});

const pairsFullyCoveredCount = lines
  .map(l => extractInts(l, {negative: false}))
  .map(([a, b, a1, b2]) => Number((a <= a1 && b >= b2) || (a1 <= a && b2 >= b)))
  .reduce((a, b) => a + b);

assert.strictEqual(pairsFullyCoveredCount, 532, 'Part 1 failed');
