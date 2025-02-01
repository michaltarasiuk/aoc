import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const initialMemoryBanks = await getInputInts({year: 2017, day: 6});

function* memoryReallocator([...memoryBanks]: number[]) {
  const seen = new Set<string>();
  while (true) {
    const currentConfig = memoryBanks.join();
    if (seen.has(currentConfig)) {
      yield seen.size;
      seen.clear();
    } else {
      seen.add(currentConfig);
    }
    let blocksToRedistribute = Math.max(...memoryBanks);
    let index = memoryBanks.indexOf(blocksToRedistribute);
    memoryBanks[index] = 0;
    while (blocksToRedistribute--) {
      memoryBanks[++index % memoryBanks.length]++;
    }
  }
}

const [redistributionCycles, loopSize] = memoryReallocator(initialMemoryBanks);

assert.strictEqual(redistributionCycles, 11137, 'Part 1 failed');
assert.strictEqual(loopSize, 1037, 'Part 2 failed');
