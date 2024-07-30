import {chunkEvery} from 'lib/chunk_every';
import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 3});

function getCols<T>(lns: T[][]) {
  return lns.reduce<T[][]>((acc, row) => {
    row.forEach((val, i) => {
      acc[i] ??= [];
      acc[i].push(val);
    });
    return acc;
  }, []);
}

function isPossibleTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const ints = lns.map(extractInts);

const triangles = ints.filter(isPossibleTriangle);

const TRIANGLES_COUNT = 3;
const triangles2 = chunkEvery(getCols(ints).flat(), TRIANGLES_COUNT).filter(
  isPossibleTriangle,
);

const possibleTrianglesCount = triangles.length;
const possibleTrianglesCount2 = triangles2.length;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(possibleTrianglesCount).toBe(993);
  });

  test('part 2', () => {
    expect(possibleTrianglesCount2).toBe(1849);
  });
}
