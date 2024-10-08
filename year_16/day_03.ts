import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2016, day: 3});

function isValidTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

function countValidTriangles(...triangles: number[][]) {
  return triangles.filter(isValidTriangle).length;
}

const TriangleSize = 3;
const triangles = lines.map(extractInts);

const validTrianglesCount = countValidTriangles(...triangles);
const validTrianglesCount2 = countValidTriangles(
  ...chunkEvery(transpose(triangles).flat(), TriangleSize)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validTrianglesCount).toBe(993);
  });

  test('part 2', () => {
    expect(validTrianglesCount2).toBe(1849);
  });
}
