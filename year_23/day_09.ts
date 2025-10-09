import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2023, day: 9});

function extrapolate(...ns: number[]): number[] {
  const diffs = ns.slice(0, -1).map((n, i) => ns.at(i + 1)! - n);
  const last = ns.at(-1)!;

  if (diffs.every(diff => diff === 0)) {
    return [last];
  }
  return [last, ...extrapolate(...diffs)];
}

let extrapolatedValuesSum = 0;
for (const l of input.split(/\n/)) {
  for (const v of extrapolate(...l.split(/\s/).map(Number))) {
    extrapolatedValuesSum += v;
  }
}

assert.strictEqual(extrapolatedValuesSum, 1939607039, 'Part 1 failed');
