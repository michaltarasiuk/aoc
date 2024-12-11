import assert from 'node:assert';

import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractIntegers} from 'lib/parse.js';

const lines = await getInputLines({year: 2016, day: 3});

function isTriangleValid([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}
function countValidTriangles(triangles: number[][]) {
  return triangles.filter(isTriangleValid).length;
}

const TriangleSides = 3;
const trianglesByRows = lines.map(l => extractIntegers(l));

const validTrianglesByRowsCount = countValidTriangles(trianglesByRows);
const validTrianglesByColumnsCount = countValidTriangles(
  chunkEvery(transpose(trianglesByRows).flat(), TriangleSides)
);

assert.strictEqual(validTrianglesByRowsCount, 993, 'Part 1 failed');
assert.strictEqual(validTrianglesByColumnsCount, 1849, 'Part 2 failed');
