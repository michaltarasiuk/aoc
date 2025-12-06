import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2022, day: 4});

function parseRange(r: string) {
  const [a, b, c, d] = r.split(/[-,]/);
  return [Number(a), Number(b), Number(c), Number(d)] as const;
}

let fullyContainedPairsCount = 0;
for (const l of input.split(/\n/)) {
  const [a, b, c, d] = parseRange(l);
  if ((a <= c && b >= d) || (c <= a && d >= b)) {
    fullyContainedPairsCount++;
  }
}

assert.strictEqual(fullyContainedPairsCount, 532, 'Part 1 failed');
