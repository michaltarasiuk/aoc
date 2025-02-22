import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2017, day: 6});

function* reallocate([...banks]: number[]) {
  const seen = new Set<string>();
  while (true) {
    const config = banks.join();
    if (seen.has(config)) {
      yield seen.size;
      seen.clear();
    } else {
      seen.add(config);
    }
    let blocks = Math.max(...banks);
    let i = banks.indexOf(blocks);
    banks[i] = 0;
    while (blocks--) {
      banks[++i % banks.length]++;
    }
  }
}

const [cycles, loopSize] = reallocate((input.match(/\d+/g) ?? []).map(Number));

assert.strictEqual(cycles, 11137, 'Part 1 failed');
assert.strictEqual(loopSize, 1037, 'Part 2 failed');
