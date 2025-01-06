import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {isObject} from 'lib/predicate.js';

const input = await getInput({year: 2015, day: 12});

const numbers: number[] = [];
const numbersWithoutRed: number[] = [];

const parsedInput = JSON.parse(input, (_, value: unknown) => {
  if (typeof value === 'number') {
    numbers.push(value);
  }
  return value;
});

JSON.stringify(parsedInput, (_, value: unknown) => {
  if (isObject(value)) {
    for (const v of Object.values(value)) {
      if (v === 'red') return;
    }
  } else if (typeof value === 'number') {
    numbersWithoutRed.push(value);
  }
  return value;
});

const sumOfNumbers = numbers.reduce((a, b) => a + b);
const sumOfNumbersWithoutRed = numbersWithoutRed.reduce((a, b) => a + b);

assert.strictEqual(sumOfNumbers, 191164, 'Part 1 failed');
assert.strictEqual(sumOfNumbersWithoutRed, 87842, 'Part 2 failed');
