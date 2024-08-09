import {getInputLns} from 'lib/input';
import {matchInts} from 'lib/match_ints';
import {pairwise} from 'lib/pairwise';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2023, day: 9});

function extrapolate(...ns: number[]): number[] {
  const differences = pairwise(ns).map(([a, b]) => b - a);
  const last = ns.at(-1)!;

  if (differences.every((difference) => difference === 0)) {
    return [last];
  }
  return [last, ...extrapolate(...differences)];
}

const extrapolatedValuesSum = sum(
  lns.map((ln) => sum(...extrapolate(...matchInts(ln)))),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(extrapolatedValuesSum).toBe(1939607039);
  });
}
