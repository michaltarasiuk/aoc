import assert from 'node:assert';

import {add} from 'lib/add.js';
import {getInput} from 'lib/input.js';
import {isRecord} from 'lib/is_record.js';

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
  if (isRecord(value)) {
    for (const v of Object.values(value)) {
      if (v === 'red') return;
    }
  } else if (typeof value === 'number') {
    numbersWithoutRed.push(value);
  }
  return value;
});

assert.strictEqual(numbers.reduce(add), 191164, 'Part 1 failed');
assert.strictEqual(numbersWithoutRed.reduce(add), 87842, 'Part 2 failed');
