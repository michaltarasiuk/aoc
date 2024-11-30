import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

const IterationsPart1 = 40;
const IterationsPart2 = 50;

let currentSequence = input;
let iterationCount = 0;

const sequenceLengths: number[] = [];

while (++iterationCount <= IterationsPart2) {
  const repeatedDigitsRe = /(?:(\d)\1*)/g;
  currentSequence = (currentSequence.match(repeatedDigitsRe) ?? [])
    .map(([...digits]) => digits.length + digits[0])
    .join('');

  if (
    iterationCount === IterationsPart1 ||
    iterationCount === IterationsPart2
  ) {
    sequenceLengths.push(currentSequence.length);
  }
}

assert.strictEqual(sequenceLengths[0], 492982, 'Part 1 failed');
assert.strictEqual(sequenceLengths[1], 6989950, 'Part 2 failed');
