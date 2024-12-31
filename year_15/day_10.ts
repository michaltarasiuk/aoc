import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

const IterationsPart1 = 40;
const IterationsPart2 = 50;

const sequenceLengths: number[] = [];

let sequence = input;
let iteration = 0;

while (++iteration <= IterationsPart2) {
  const repeatedDigitsRe = /(?:(\d)\1*)/g;
  sequence = (sequence.match(repeatedDigitsRe) ?? [])
    .map(([...digits]) => digits.length + digits[0])
    .join('');

  if ([IterationsPart1, IterationsPart2].includes(iteration)) {
    sequenceLengths.push(sequence.length);
  }
}

assert.strictEqual(sequenceLengths[0], 492982, 'Part 1 failed');
assert.strictEqual(sequenceLengths[1], 6989950, 'Part 2 failed');
