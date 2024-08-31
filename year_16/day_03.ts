import {chunkEvery} from 'lib/chunk';
import {getInputLines} from 'lib/input';
import {matchInts} from 'lib/ints';
import {transpose} from 'lib/transpose';

const lines = await getInputLines({year: 2016, day: 3});

function isPossibleTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const ints = lines.map(matchInts);

const triangles = ints.filter(isPossibleTriangle);

const TRIANGLES_COUNT = 3;
const triangles2 = chunkEvery(transpose(ints).flat(), TRIANGLES_COUNT).filter(
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
