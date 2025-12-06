import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 3});

const multiplyRe = /mul\((\d+),(\d+)\)/g;
const multiplyRe2 = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;

const sum = input
  .matchAll(multiplyRe)
  .reduce((acc, [, a, b]) => acc + Number(a) * Number(b), 0);

const sum2 = input.matchAll(multiplyRe2).reduce(
  (acc, [instruction, a, b]) => {
    if (instruction === 'do()') {
      acc.do = true;
    } else if (instruction === `don't()`) {
      acc.do = false;
    } else if (acc.do) {
      acc.val += Number(a) * Number(b);
    }
    return acc;
  },
  {val: 0, do: true}
);

assert.strictEqual(sum, 161289189, 'Part 1 failed');
assert.strictEqual(sum2.val, 83595109, 'Part 2 failed');
