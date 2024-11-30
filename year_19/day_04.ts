import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {parseNumbers} from 'lib/parse.js';

const input = await getInput({year: 2019, day: 4});

const [start, end] = parseNumbers(input, {negative: false});
const twoAdjacentDigitsRe = /(\d)\1/;

let passwordsCount = 0;
for (let i = start; i <= end; i++) {
  const s = String(i);

  if (twoAdjacentDigitsRe.test(s) && s === Array.from(s).toSorted().join('')) {
    passwordsCount++;
  }
}

assert.strictEqual(passwordsCount, 1686, 'Part 1 failed');
