import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 3});

const triangles = lns
  .map(extractInts)
  .filter(([a, b, c]) => a + b > c && a + c > b && b + c > a);

const possibleTrianglesCount = triangles.length;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(possibleTrianglesCount).toBe(993);
  });
}
