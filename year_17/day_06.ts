import assert from 'node:assert';

import {getInputNumbers} from 'lib/input.js';

const ns = await getInputNumbers({year: 2017, day: 6});

function redistributeMemoryBlocks([...blocks]: number[]) {
  const cycles: number[] = [];
  function redistribute() {
    const seen = new Set<string>();
    while (true) {
      const snapshot = blocks.join();
      if (seen.has(snapshot)) {
        return seen.size;
      } else {
        seen.add(snapshot);
      }
      let max = Math.max(...blocks);
      let idx = blocks.indexOf(max);
      blocks[idx] = 0;
      while (max--) {
        blocks[++idx % blocks.length]++;
      }
    }
  }
  return {
    cycles,
    run() {
      cycles.push(redistribute());
      return this;
    },
  };
}

const {cycles} = redistributeMemoryBlocks(ns).run().run();

assert.strictEqual(cycles[0], 11137, 'Part 1 failed');
assert.strictEqual(cycles[1], 1037, 'Part 2 failed');
