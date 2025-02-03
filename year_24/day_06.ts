import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2024, day: 6});

const GuardStart = '^';
const Obstacle = '#';
const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const grid = input.split(/\n/).map(([...l]) => l);

let y = grid.findIndex(l => l.includes(GuardStart));
let x = grid[y].indexOf(GuardStart);

const path: string[] = [];
let dir = 0;
while (true) {
  path.push(`${x},${y}`);
  const nextX = x + Directions[dir][0];
  const nextY = y + Directions[dir][1];
  const nextPosition = grid[nextY]?.[nextX];
  if (nextPosition === Obstacle) {
    dir = (dir + 1) % Directions.length;
  } else if (!nextPosition) {
    break;
  } else {
    [x, y] = [nextX, nextY];
  }
}

assert.strictEqual(new Set(path).size, 4973, 'Part 1 failed');
