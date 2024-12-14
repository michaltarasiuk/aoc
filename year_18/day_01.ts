import assert from 'node:assert';

import {getInputIntegers} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputIntegers({year: 2018, day: 1});

function findFirstFrequencyReachesTwice(...ns: number[]) {
  const frequencies = new Set<number>();
  let frequency = 0;

  while (true) {
    for (const n of ns) {
      frequency += n;

      if (frequencies.has(frequency)) {
        return frequency;
      }
      frequencies.add(frequency);
    }
  }
}

const frequency = sum(...ns);
const firstFrequencyReachesTwice = findFirstFrequencyReachesTwice(...ns);

assert.strictEqual(frequency, 522, 'Part 1 failed');
assert.strictEqual(firstFrequencyReachesTwice, 73364, 'Part 2 failed');
