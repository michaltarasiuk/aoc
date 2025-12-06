import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2017, day: 6});

function* reallocate([...banks]: number[]) {
  const visited = new Set<string>();
  while (true) {
    const key = banks.join();
    if (visited.has(key)) {
      yield visited.size;
      visited.clear();
    } else {
      visited.add(key);
    }
    let blocks = Math.max(...banks);
    let index = banks.indexOf(blocks);
    banks[index] = 0;
    while (blocks--) {
      banks[++index % banks.length]++;
    }
  }
}

const banks = input.match(/\d+/g)?.map(Number) ?? raise('Invalid input');
const [cycles, loopSize] = reallocate(banks);

assert.strictEqual(cycles, 11137, 'Part 1 failed');
assert.strictEqual(loopSize, 1037, 'Part 2 failed');
