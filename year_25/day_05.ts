import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2025, day: 5});

const [ranges, ids] = input.split(/\n\n/).map(p => p.split(/\n/));

const freshRanges = ranges.map(r => {
  const [start, end] = r.split('-');
  return {start: Number(start), end: Number(end)};
});

const mergedFreshRanges = freshRanges
  .toSorted((a, b) => a.start - b.start)
  .reduce<typeof freshRanges>((acc, r) => {
    const last = acc.at(-1);
    if (!isDefined(last) || r.start > last.end) {
      acc.push(r);
    } else if (r.end > last.end) {
      last.end = r.end;
    }
    return acc;
  }, []);

const ingredientIds = ids.map(Number);

let freshCount = 0;
for (const id of ingredientIds) {
  for (const r of mergedFreshRanges) {
    if (id >= r.start && id <= r.end) {
      freshCount++;
      break;
    }
  }
}

const totalFreshIds = mergedFreshRanges.reduce(
  (acc, r) => acc + (r.end - r.start + 1),
  0
);

assert.strictEqual(freshCount, 874, 'Part 1 failed');
assert.strictEqual(totalFreshIds, 348548952146313, 'Part 2 failed');
