import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2025, day: 5});

const [ranges, ids] = input.split(/\n\n/);

const freshRanges = ranges
  .split(/\n/)
  .map(r => r.split('-').map(Number) as [number, number])
  .sort((a, b) => a[0] - b[0])
  .reduce<[number, number][]>((acc, [start, end]) => {
    const last = acc.at(-1);
    if (!isDefined(last) || start > last[1]) {
      acc.push([start, end]);
    } else if (end > last[1]) {
      last[1] = end;
    }
    return acc;
  }, []);

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

const totalFreshIds = freshRanges.reduce(
  (acc, [start, end]) => acc + (end - start + 1),
  0
);

assert.strictEqual(freshCount, 874, 'Part 1 failed');
assert.strictEqual(totalFreshIds, 348548952146313, 'Part 2 failed');
