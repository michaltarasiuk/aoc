import assert from 'node:assert';

import {transpose} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {chunkEvery} from 'lib/iterable.js';
import {extractIntegers} from 'lib/parse.js';

const lines = await getInputLines({year: 2016, day: 3});

function isValidTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const TriangleSides = 3;

const trianglesByRows = lines.map(l => extractIntegers(l));
const validTrianglesByRows = trianglesByRows.filter(isValidTriangle);

const trianglesByColumns = chunkEvery(
  transpose(trianglesByRows).flat(),
  TriangleSides
);
const validTrianglesByColumns = trianglesByColumns.filter(isValidTriangle);

assert.strictEqual(validTrianglesByRows.length, 993, 'Part 1 failed');
assert.strictEqual(validTrianglesByColumns.length, 1849, 'Part 2 failed');
