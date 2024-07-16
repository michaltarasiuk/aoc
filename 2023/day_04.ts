import 'core-js/proposals/set-methods';

import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

declare global {
  interface Set<T> {
    intersection(other: Set<T>): Set<T>;
  }
}

const lns = await getInputLns({year: 2023, day: 4});

const points = lns.reduce((acc, ln) => {
  const [[, ...a], b] = ln.split('|').map(extractInts);
  const matches = new Set(a).intersection(new Set(b));

  if (matches.size) {
    acc += Math.pow(2, matches.size - 1);
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(points).toBe(26218);
  });
}
