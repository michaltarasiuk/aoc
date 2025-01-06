import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 8});

const originalLengths = lines.map(l => l.length);
const evaluatedLengths = (<string[]>eval(`[${lines.join()}]`)).map(
  l => l.length
);
const encodedLengths = lines.map(l => JSON.stringify(l).length);

const diff =
  originalLengths.reduce((acc, length) => acc + length) -
  evaluatedLengths.reduce((acc, length) => acc + length);

const diff2 =
  encodedLengths.reduce((acc, length) => acc + length) -
  originalLengths.reduce((acc, length) => acc + length);

assert.strictEqual(diff, 1350, 'Part 1 failed');
assert.strictEqual(diff2, 2085, 'Part 2 failed');
