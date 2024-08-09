import {getInputLines} from 'lib/input';
import {matchUints} from 'lib/ints';

const lines = await getInputLines({year: 2022, day: 4});

const pairsFullyCoveredCount = lines.reduce((acc, pairs) => {
  const [a, b, a1, b2] = matchUints(pairs);

  if ((a <= a1 && b >= b2) || (a1 <= a && b2 >= b)) {
    acc++;
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(pairsFullyCoveredCount).toBe(532);
  });
}
