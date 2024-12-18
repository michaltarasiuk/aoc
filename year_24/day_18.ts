import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2024, day: 18});

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

const bytes = lines.map(l => l.split(',').map(Number));
const memorySpace = [...Array(Size)].map(() => Array(Size).fill(Safe));
for (const [i, j] of bytes.slice(0, MaxBytes)) {
  memorySpace[j][i] = Corrupted;
}

const stack: [Point, steps: number][] = [[StartPoint, 0]];
const seen = new Set<string>();

while (stack.length > 0) {
  const [[x, y], steps] = stack.shift()!;
  if (seen.has(`${x},${y}`)) {
    continue;
  } else {
    seen.add(`${x},${y}`);
  }
  if (x === EndPoint[0] && y === EndPoint[1]) {
    assert.strictEqual(steps, 246, 'Part 1 failed');
    continue;
  }
  for (const [dx, dy] of Directions) {
    const i = x + dx;
    const j = y + dy;
    if (memorySpace[j]?.[i] === Safe) {
      stack.push([[i, j], steps + 1]);
    }
  }
}
