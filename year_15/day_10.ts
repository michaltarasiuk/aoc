import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

const Steps = 40;
const Steps2 = 50;

const sequenceLengths: number[] = [];

let currentSequence = input;
let step = 0;

while (++step <= Steps2) {
  currentSequence = (currentSequence.match(/(?:(\d)\1*)/g) ?? [])
    .map(([...group]) => group.length + group[0])
    .join('');
  if ([Steps, Steps2].includes(step)) {
    sequenceLengths.push(currentSequence.length);
  }
}

assert.strictEqual(sequenceLengths[0], 492982, 'Part 1 failed');
assert.strictEqual(sequenceLengths[1], 6989950, 'Part 2 failed');
