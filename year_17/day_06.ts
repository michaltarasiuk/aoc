import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2017, day: 6});

function* reallocate([...banks]: number[]) {
  const visited = new Set<string>();
  while (true) {
    if (visited.has(banks.join())) {
      yield visited.size;
      visited.clear();
    } else {
      visited.add(banks.join());
    }
    let blocks = Math.max(...banks);
    let index = banks.indexOf(blocks);
    banks[index] = 0;
    while (blocks--) {
      banks[++index % banks.length]++;
    }
  }
}

const [cycles, loopSize] = reallocate((input.match(/\d+/g) ?? []).map(Number));

assert.strictEqual(cycles, 11137, 'Part 1 failed');
assert.strictEqual(loopSize, 1037, 'Part 2 failed');
