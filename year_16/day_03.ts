import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractInts} from 'lib/parse.js';

const inputLines = await getInputLines({year: 2016, day: 3});

function isTriangleValid([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

function countValidTriangles(triangles: number[][]) {
  return triangles.filter(isTriangleValid).length;
}

const TriangleSides = 3;
const trianglesByRows = inputLines.map(extractInts);

const validTrianglesByRowsCount = countValidTriangles(trianglesByRows);
const validTrianglesByColumnsCount = countValidTriangles(
  chunkEvery(transpose(trianglesByRows).flat(), TriangleSides)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(validTrianglesByRowsCount).toBe(993));
  test('part 2', () => expect(validTrianglesByColumnsCount).toBe(1849));
}
