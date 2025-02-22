import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2018, day: 1});

const frequencyChanges = input.split(/\n/).map(Number);

const resultingFrequency = frequencyChanges.reduce((a, b) => a + b);

const seenFrequencies = new Set<number>();

let currentFrequency = 0;
let firstRepeatedFrequency = 0;
outer: while (true) {
  for (const change of frequencyChanges) {
    currentFrequency += change;
    if (seenFrequencies.has(currentFrequency)) {
      firstRepeatedFrequency = currentFrequency;
      break outer;
    } else {
      seenFrequencies.add(currentFrequency);
    }
  }
}

assert.strictEqual(resultingFrequency, 522, 'Part 1 failed');
assert.strictEqual(firstRepeatedFrequency, 73364, 'Part 2 failed');
