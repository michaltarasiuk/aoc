import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2021, day: 9});

const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function isLowPoint(map: number[][], x: number, y: number) {
  return !Directions.some(([i, j]) => map[y][x] >= map[y + j]?.[x + i]);
}

const heightMap = input.split(/\n/).map(([...l]) => l.map(Number));

let riskLevel = 0;
for (const y of heightMap.keys()) {
  for (const x of heightMap[y].keys()) {
    if (isLowPoint(heightMap, x, y)) {
      riskLevel += heightMap[y][x] + 1;
    }
  }
}

assert.strictEqual(riskLevel, 480, 'Part 1 failed');
