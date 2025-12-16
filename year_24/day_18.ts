import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 18});

const SIZE = 71;
const MAX_BYTES = 1024;

type Point = [x: number, y: number];
const START_POINT: Point = [0, 0];
const END_POINT: Point = [SIZE - 1, SIZE - 1];

const CORRUPTED = '#';
const SAFE = '.';

const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function findShortestPath(memoryGrid: string[][]): number {
  const stack: [Point, steps: number][] = [[START_POINT, 0]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [[x, y], steps] = stack.shift()!;
    if (visited.has(`${x},${y}`)) {
      continue;
    } else {
      visited.add(`${x},${y}`);
    }
    if (x === END_POINT[0] && y === END_POINT[1]) {
      return steps;
    }
    for (const [dx, dy] of DIRECTIONS) {
      const i = x + dx;
      const j = y + dy;
      if (memoryGrid[j]?.[i] === SAFE) {
        stack.push([[i, j], steps + 1]);
      }
    }
  }
  return -1;
}

const bytes = input.split(/\n/).map(l => l.split(',').map(Number));
const memorySpace = [...Array(SIZE)].map(() => Array(SIZE).fill(SAFE));

for (const [i, j] of bytes.splice(0, MAX_BYTES)) {
  memorySpace[j][i] = CORRUPTED;
}
assert.strictEqual(findShortestPath(memorySpace), 246, 'Part 1 failed');

while (bytes.length > 0) {
  const [i, j] = bytes.shift()!;
  memorySpace[j][i] = CORRUPTED;
  if (findShortestPath(memorySpace) === -1) {
    assert.strictEqual(`${i},${j}`, '22,50', 'Part 2 failed');
    break;
  }
}
