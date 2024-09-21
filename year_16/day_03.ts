import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractInts} from 'lib/parse.js';

const lines = (await getInputLines({year: 2016, day: 3})).map(line =>
  extractInts(line)
);

function isPossibleTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const TRIANGLES_COUNT = 3;

const triangles = lines.filter(isPossibleTriangle);
const triangles2 = chunkEvery(transpose(lines).flat(), TRIANGLES_COUNT).filter(
  isPossibleTriangle
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
