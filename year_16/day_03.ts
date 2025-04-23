import assert from 'node:assert';

import {chunkEvery} from 'lib/chunk_every.js';
import {readInput} from 'lib/input.js';

const input = await readInput({year: 2016, day: 3});

const TriangleSides = 3;

function isValidTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const liens = input.split(/\n/);
const trianglesByRows = liens.map(l => l.split(/\s+/).map(Number).slice(1));

const cols: number[][] = [];
for (const triangle of trianglesByRows) {
  for (const [k, v] of triangle.entries()) {
    (cols[k] ??= []).push(v);
  }
}
const trianglesByCols = chunkEvery(cols.flat(), TriangleSides);

assert.strictEqual(
  trianglesByRows.filter(isValidTriangle).length,
  993,
  'Part 1 failed'
);
assert.strictEqual(
  trianglesByCols.filter(isValidTriangle).length,
  1849,
  'Part 2 failed'
);
