import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const ns = await getInputInts({year: 2018, day: 1});

function findFirstFrequencyReachesTwice(...ns: number[]) {
  const frequencies = new Set<number>();
  let frequency = 0;
  while (true) {
    for (const n of ns) {
      frequency += n;
      if (frequencies.has(frequency)) {
        return frequency;
      } else {
        frequencies.add(frequency);
      }
    }
  }
}

const frequency = ns.reduce((a, b) => a + b);
const firstFrequencyReachesTwice = findFirstFrequencyReachesTwice(...ns);

assert.strictEqual(frequency, 522, 'Part 1 failed');
assert.strictEqual(firstFrequencyReachesTwice, 73364, 'Part 2 failed');
