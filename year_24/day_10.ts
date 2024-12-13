import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';
import {sum} from 'lib/math.js';

const grid = await getInputGrid({year: 2024, day: 10}, char => Number(char));

const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function* findTrails(
  grid: number[][],
  {x, y}: {x: number; y: number},
  {increment, max} = {increment: 1, max: 9}
): Generator<string> {
  for (const [dx, dy] of Directions) {
    const i = x + dx;
    const j = y + dy;
    if (!grid[j]?.[i]) {
      continue;
    } else if (grid[y][x] === max - increment && grid[j][i] === max) {
      yield `${i},${j}`;
    } else if (grid[j][i] === grid[y][x] + increment) {
      yield* findTrails(grid, {x: i, y: j});
    }
  }
}

const trailheadScores: Record<string, Set<string>> = {};
const trailheadRatings: Record<string, Array<string>> = {};

for (const [y, row] of grid.entries()) {
  for (const [x, height] of row.entries()) {
    if (height === 0) {
      const trailhead = `${x},${y}`;
      for (const trail of findTrails(grid, {x, y})) {
        (trailheadScores[trailhead] ??= new Set()).add(trail);
        (trailheadRatings[trailhead] ??= []).push(trail);
      }
    }
  }
}

const totalScore = Object.keys(trailheadScores)
  .map(id => trailheadScores[id].size)
  .reduce((a, b) => a + b, 0);

const totalRating = Object.keys(trailheadRatings)
  .map(id => trailheadRatings[id].length)
  .reduce((a, b) => a + b, 0);

assert.strictEqual(totalScore, 548, 'Part 1 failed');
assert.strictEqual(totalRating, 1252, 'Part 2 failed');
