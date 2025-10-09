import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2018, day: 1});

const changes = input.split(/\n/).map(Number);
const resultFreq = changes.reduce((a, b) => a + b);
const seen = new Set<number>();

let freq = 0;
let firstRepeat = 0;
outer: while (true) {
  for (const change of changes) {
    freq += change;
    if (seen.has(freq)) {
      firstRepeat = freq;
      break outer;
    } else {
      seen.add(freq);
    }
  }
}

assert.strictEqual(resultFreq, 522, 'Part 1 failed');
assert.strictEqual(firstRepeat, 73364, 'Part 2 failed');
