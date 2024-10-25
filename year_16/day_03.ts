import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractInts} from 'lib/parse.js';

const inputLines = await getInputLines({year: 2016, day: 3});

function isTriangleValid([side1, side2, side3]: number[]) {
  return (
    side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1
  );
}

function countValidTriangles(triangles: number[][]) {
  return triangles.filter(isTriangleValid).length;
}

const TRIANGLE_SIDES = 3;
const trianglesByRows = inputLines.map(extractInts);

const validTrianglesByRowsCount = countValidTriangles(trianglesByRows);
const validTrianglesByColumnsCount = countValidTriangles(
  chunkEvery(transpose(trianglesByRows).flat(), TRIANGLE_SIDES)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validTrianglesByRowsCount).toBe(993);
  });

  test('part 2', () => {
    expect(validTrianglesByColumnsCount).toBe(1849);
  });
}
