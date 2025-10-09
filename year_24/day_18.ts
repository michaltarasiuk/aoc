import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2024, day: 18});

const Size = 71;
const MaxBytes = 1024;

type Point = [x: number, y: number];
const StartPoint: Point = [0, 0];
const EndPoint: Point = [Size - 1, Size - 1];

const Corrupted = '#';
const Safe = '.';

const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function findShortestPath(memoryGrid: string[][]): number {
  const stack: [Point, steps: number][] = [[StartPoint, 0]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [[x, y], steps] = stack.shift()!;
    if (visited.has(`${x},${y}`)) {
      continue;
    } else {
      visited.add(`${x},${y}`);
    }
    if (x === EndPoint[0] && y === EndPoint[1]) {
      return steps;
    }
    for (const [dx, dy] of Directions) {
      const i = x + dx;
      const j = y + dy;
      if (memoryGrid[j]?.[i] === Safe) {
        stack.push([[i, j], steps + 1]);
      }
    }
  }
  return -1;
}

const bytes = input.split(/\n/).map(l => l.split(',').map(Number));
const memorySpace = [...Array(Size)].map(() => Array(Size).fill(Safe));

for (const [i, j] of bytes.splice(0, MaxBytes)) {
  memorySpace[j][i] = Corrupted;
}
assert.strictEqual(findShortestPath(memorySpace), 246, 'Part 1 failed');

while (bytes.length > 0) {
  const [i, j] = bytes.shift()!;
  memorySpace[j][i] = Corrupted;
  if (findShortestPath(memorySpace) === -1) {
    assert.strictEqual(`${i},${j}`, '22,50', 'Part 2 failed');
    break;
  }
}
