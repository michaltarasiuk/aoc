import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 5});

const [ranges, ids] = input.split(/\n\n/);

const freshRanges = ranges.split(/\n/).map(r => {
  const [start, end] = r.split('-').map(Number);
  return [start, end] as const;
});

const ingredientIds = ids.split(/\n/).map(Number);

let freshCount = 0;
for (const id of ingredientIds) {
  for (const [start, end] of freshRanges) {
    if (id >= start && id <= end) {
      freshCount++;
      break;
    }
  }
}

assert.strictEqual(freshCount, 874, 'Part 1 failed');
