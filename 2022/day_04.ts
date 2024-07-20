import {extractUints} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2022, day: 4});

const pairsFullyCoveredCount = lns.reduce((acc, pairs) => {
  const [a, b, a1, b2] = extractUints(pairs);

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
