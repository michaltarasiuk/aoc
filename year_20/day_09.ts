import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2020, day: 9});

function hasSum(preamble: number[], target: number) {
  return preamble.some(a => preamble.some(b => a !== b && a + b === target));
}
function findInvalid(nums: number[], preambleLen: number) {
  for (let i = preambleLen; i < nums.length; i++) {
    if (!hasSum(nums.slice(i - preambleLen, i), nums[i])) {
      return nums[i];
    }
  }
  throw new Error('Invalid number not found');
}

function findContiguousSet(nums: number[], target: number) {
  for (const i of nums.keys()) {
    const set: number[] = [];
    for (const n of nums.slice(i)) {
      set.push(n);
      if (set.reduce((a, b) => a + b) === target) {
        return set;
      }
    }
  }
  throw new Error('Contiguous set not found');
}

const PreambleLen = 25;

const nums = input.split(/\n/).map(Number);

const invalidNum = findInvalid(nums, PreambleLen);

const set = findContiguousSet(nums, invalidNum);
const weakness = Math.min(...set) + Math.max(...set);

assert.strictEqual(invalidNum, 2089807806, 'Part 1 failed');
assert.strictEqual(weakness, 245848639, 'Part 2 failed');
