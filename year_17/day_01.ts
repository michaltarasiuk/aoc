import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2017, day: 1});

const digits = Array.from(input, Number);

const captchaPart1 = digits
  .filter((d, i) => d === digits.at((i + 1) % digits.length))
  .reduce((a, b) => a + b);

const captchaPart2 = digits
  .filter((d, i) => d === digits.at((i + digits.length / 2) % digits.length))
  .reduce((a, b) => a + b);

assert.strictEqual(captchaPart1, 1203, 'Part 1 failed');
assert.strictEqual(captchaPart2, 1146, 'Part 2 failed');
