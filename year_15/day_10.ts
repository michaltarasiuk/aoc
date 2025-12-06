import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 10});

const StepsPart1 = 40;
const StepsPart2 = 50;

const sequenceLengths: number[] = [];

let currentSequence = input;
let step = 0;

while (++step <= StepsPart2) {
  currentSequence = currentSequence
    .matchAll(/(\d)\1*/g)
    .map(m => m[0].length + m[1])
    .toArray()
    .join('');
  if ([StepsPart1, StepsPart2].includes(step)) {
    sequenceLengths.push(currentSequence.length);
  }
}

assert.strictEqual(sequenceLengths[0], 492982, 'Part 1 failed');
assert.strictEqual(sequenceLengths[1], 6989950, 'Part 2 failed');
