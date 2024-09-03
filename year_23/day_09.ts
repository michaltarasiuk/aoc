import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';
import {extractInts} from 'lib/parse';

const lines = await getInputLines({year: 2023, day: 9});

function extrapolate(...ns: number[]): number[] {
  const differences = ns.slice(0, -1).map((n, i) => ns.at(i + 1)! - n);
  const last = ns.at(-1)!;

  if (differences.every(difference => difference === 0)) {
    return [last];
  }
  return [last, ...extrapolate(...differences)];
}

const extrapolatedValuesSum = sum(
  lines.map(line => sum(...extrapolate(...extractInts(line))))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(extrapolatedValuesSum).toBe(1939607039);
  });
}
