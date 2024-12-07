import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2024, day: 6});

const GuardStart = '^';
const Obstacle = '#';
const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function findGuardStart() {
  const y = grid.findIndex(row => row.includes(GuardStart));
  const x = grid[y].indexOf(GuardStart);
  return [x, y] as const;
}
function calcGuardPath() {
  const path: string[] = [];
  let [[x, y], direction] = [findGuardStart(), 0];
  while (true) {
    path.push(`${x},${y}`);
    const nextX = x + Directions[direction][0];
    const nextY = y + Directions[direction][1];
    const nextPosition = grid[nextY]?.[nextX];
    if (nextPosition === Obstacle) {
      direction = (direction + 1) % Directions.length;
    } else if (!nextPosition) {
      break;
    } else {
      [x, y] = [nextX, nextY];
    }
  }
  return path;
}

assert.strictEqual(new Set(calcGuardPath()).size, 4973, 'Part 1 failed');
