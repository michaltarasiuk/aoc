import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2020, day: 10});

const adapters = lines.map(Number).sort((a, b) => a - b);
assert(adapters.length > 0, 'No adapters found');
assert(new Set(adapters).size === adapters.length, 'Duplicate adapters found');
adapters.push(adapters[adapters.length - 1] + 3);

const diffs: Record<number, number> = {};
for (const joltage of adapters) {
  const diff = joltage - (adapters[adapters.indexOf(joltage) - 1] ?? 0);
  assert(diff >= 1 && diff <= 3, 'Invalid adapter');
  diffs[diff] = (diffs[diff] ?? 0) + 1;
}

assert.strictEqual(diffs[1] * diffs[3], 2210, 'Part 1 failed');
