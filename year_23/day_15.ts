import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2023, day: 15});

const Multiplier = 17;
const Modulo = 256;

let hashSum = 0;
for (const step of input.split(',')) {
  let charSum = 0;
  for (const char of step) {
    charSum += char.charCodeAt(0);
    charSum *= Multiplier;
    charSum %= Modulo;
  }
  hashSum += charSum;
}

assert.strictEqual(hashSum, 505459, 'Part 1 failed');
