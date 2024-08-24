import {getInputLines} from 'lib/input';
import {matchUints} from 'lib/ints';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2022, day: 4});

const pairsFullyCoveredCount = sum(
  ...lines.map((pairs) => {
    const [a, b, a1, b2] = matchUints(pairs);
    return Number((a <= a1 && b >= b2) || (a1 <= a && b2 >= b));
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(pairsFullyCoveredCount).toBe(532);
  });
}
