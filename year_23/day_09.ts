import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {matchInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 9});

function extrapolate(...ns: number[]): number[] {
  const diffs = ns.slice(0, -1).map((n, i) => ns.at(i + 1)! - n);
  const last = ns.at(-1)!;

  if (diffs.every(diff => diff === 0)) {
    return [last];
  }
  return [last, ...extrapolate(...diffs)];
}

const extrapolatedValuesSum = sum(
  ...lines.map(matchInts).map(ns => sum(...extrapolate(...ns)))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(extrapolatedValuesSum).toBe(1939607039));
}
