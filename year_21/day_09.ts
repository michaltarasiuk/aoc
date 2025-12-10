import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2021, day: 9});

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const heightMap = input.split(/\n/).map(l => [...l].map(Number));

let riskLevel = 0;
for (const y of heightMap.keys()) {
  for (const x of heightMap[y].keys()) {
    if (isLowPoint(heightMap, x, y)) {
      riskLevel += heightMap[y][x] + 1;
    }
  }
}

assert.strictEqual(riskLevel, 480, 'Part 1 failed');

function isLowPoint(heightMap: number[][], x: number, y: number) {
  return !directions.some(
    ([i, j]) => heightMap[y][x] >= heightMap[y + j]?.[x + i]
  );
}
