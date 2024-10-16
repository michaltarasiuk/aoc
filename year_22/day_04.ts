import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2022, day: 4});

const pairsFullyCoveredCount = sum(
  ...lines
    .map(l => l.matchAll(/\d+/g).map(([n]) => Number(n)))
    .map(([a, b, a1, b2]) =>
      Number((a <= a1 && b >= b2) || (a1 <= a && b2 >= b))
    )
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(pairsFullyCoveredCount).toBe(532);
  });
}
