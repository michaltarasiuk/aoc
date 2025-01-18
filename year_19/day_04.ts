import assert from 'node:assert';

import {getInputIntegers} from 'lib/input.js';

const [start, end] = await getInputIntegers(
  {year: 2019, day: 4},
  {negative: false}
);

let passwordsCount = 0;
for (let i = start; i <= end; i++) {
  const s = String(i);
  if (/(\d)\1/.test(s) && s === [...s].sort().join('')) {
    passwordsCount++;
  }
}

assert.strictEqual(passwordsCount, 1686, 'Part 1 failed');
