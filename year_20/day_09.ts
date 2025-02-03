import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2020, day: 9});

function isSumOfTwoNumbers(preamble: number[], target: number) {
  return preamble.some(n => preamble.some(n2 => n !== n2 && n + n2 === target));
}
function findFirstInvalidNumber(numbers: number[], preambleLength: number) {
  for (let i = preambleLength; i < numbers.length; i++) {
    if (!isSumOfTwoNumbers(numbers.slice(i - preambleLength, i), numbers[i])) {
      return numbers[i];
    }
  }
  throw new Error('Invalid number not found');
}

function findContiguousSetSummingTo(numbers: number[], target: number) {
  for (const i of numbers.keys()) {
    const contiguousSet: number[] = [];
    for (const num of numbers.slice(i)) {
      contiguousSet.push(num);
      if (contiguousSet.reduce((a, b) => a + b) === target) {
        return contiguousSet;
      }
    }
  }
  throw new Error('Contiguous set not found');
}

const PreambleLength = 25;

const numbers = input.split(/\n/).map(Number);

const firstInvalidNumber = findFirstInvalidNumber(numbers, PreambleLength);

const contiguousSet = findContiguousSetSummingTo(numbers, firstInvalidNumber);
const encryptionWeakness =
  Math.min(...contiguousSet) + Math.max(...contiguousSet);

assert.strictEqual(firstInvalidNumber, 2089807806, 'Part 1 failed');
assert.strictEqual(encryptionWeakness, 245848639, 'Part 2 failed');
