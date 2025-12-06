import assert from 'node:assert';

import {chunkEvery} from '#lib/chunk_every.js';
import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2016, day: 3});

const TriangleSides = 3;

function parseTriangle(t: string) {
  const triangle = Array.from(t.matchAll(/\d+/g), Number);
  assert(triangle.length === 3);
  return triangle;
}

function isValidTriangle([a, b, c]: number[]) {
  return a + b > c && a + c > b && b + c > a;
}

const trianglesByRows = input.split(/\n/).map(parseTriangle);

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
