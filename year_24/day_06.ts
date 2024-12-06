import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2024, day: 6});

const Obstacle = '#';
const StartingPoint = '^';

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let currentDirection = 0;

const visitedPositions = new Set<string>();
let [guardX, guardY] = (() => {
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      if (grid[y][x] === StartingPoint) {
        return [x, y];
      }
    }
  }
  throw new Error('No starting point found');
})();

while (true) {
  visitedPositions.add(`${guardX},${guardY}`);
  const nextX = guardX + directions[currentDirection][0];
  const nextY = guardY + directions[currentDirection][1];
  const nextPosition = grid[nextY]?.[nextX];
  if (nextPosition === Obstacle) {
    currentDirection = (currentDirection + 1) % directions.length;
  } else if (!nextPosition) {
    break;
  } else {
    guardX = nextX;
    guardY = nextY;
  }
}

assert.strictEqual(visitedPositions.size, 4973, 'Part 1 failed');
