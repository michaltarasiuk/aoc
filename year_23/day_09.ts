import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {extractIntegers} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 9});

function extrapolate(...ns: number[]): number[] {
  const diffs = ns.slice(0, -1).map((n, i) => ns.at(i + 1)! - n);
  const last = ns.at(-1)!;

  if (diffs.every(diff => diff === 0)) {
    return [last];
  }
  return [last, ...extrapolate(...diffs)];
}

const extrapolatedValuesSum = lines
  .flatMap(l => extrapolate(...extractIntegers(l)))
  .reduce((a, b) => a + b);

assert.strictEqual(extrapolatedValuesSum, 1939607039, 'Part 1 failed');
