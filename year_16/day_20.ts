import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2016, day: 20});

type Range = ReturnType<typeof parseRange>;

function parseRange(range: string) {
  const rangeRe = /^(\d+)-(\d+)$/;
  const [_, start, end] = rangeRe.exec(range) ?? raise('Invalid range');
  return {start: Number(start), end: Number(end)};
}

const ranges = input
  .split('\n')
  .map(parseRange)
  .sort((a, b) => a.start - b.start);

const mergedRanges: Range[] = [];
for (const range of ranges) {
  const lastRange = mergedRanges.at(-1);
  if (!isDefined(lastRange) || range.start > lastRange.end + 1) {
    mergedRanges.push(range);
  } else {
    lastRange.end = Math.max(lastRange.end, range.end);
  }
}

let allowedIPsCount = 0;
for (const k of mergedRanges.keys().drop(1)) {
  const a = mergedRanges[k - 1];
  const b = mergedRanges[k];
  allowedIPsCount += b.start - a.end - 1;
}

assert.strictEqual(mergedRanges[0].end + 1, 23923783, 'Part 1 failed');
assert.strictEqual(allowedIPsCount, 125, 'Part 2 failed');
