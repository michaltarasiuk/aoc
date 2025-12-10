import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 6});

const GUARD_START = '^';
const OBSTACLE = '#';
const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const grid = input.split(/\n/).map(l => [...l]);
const path: string[] = [];

let dir = 0;
let y = grid.findIndex(l => l.includes(GUARD_START));
let x = grid[y].indexOf(GUARD_START);
while (true) {
  path.push(`${x},${y}`);
  const nextX = x + directions[dir][0];
  const nextY = y + directions[dir][1];
  const nextPosition = grid[nextY]?.[nextX];
  if (nextPosition === OBSTACLE) {
    dir = (dir + 1) % directions.length;
  } else if (!nextPosition) {
    break;
  } else {
    [x, y] = [nextX, nextY];
  }
}

assert.strictEqual(new Set(path).size, 4973, 'Part 1 failed');
