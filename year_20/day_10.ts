import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2020, day: 10});

const adapters = (input.match(/\d+/g) ?? []).map(Number).sort((a, b) => a - b);
assert(adapters.length > 0, 'No adapters found');
assert(new Set(adapters).size === adapters.length, 'Duplicate adapters found');
adapters.push(adapters.at(-1)! + 3);

const diffs: Record<number, number> = {};
for (const joltage of adapters) {
  const diff = joltage - (adapters[adapters.indexOf(joltage) - 1] ?? 0);
  assert(diff >= 1 && diff <= 3, 'Invalid adapter');
  diffs[diff] = (diffs[diff] ?? 0) + 1;
}

const paths: Record<number, number> = {0: 1};
for (const joltage of adapters) {
  paths[joltage] =
    (paths[joltage - 1] ?? 0) +
    (paths[joltage - 2] ?? 0) +
    (paths[joltage - 3] ?? 0);
}

assert.strictEqual(diffs[1] * diffs[3], 2210, 'Part 1 failed');
assert.strictEqual(paths[adapters.at(-1)!], 7086739046912, 'Part 2 failed');
