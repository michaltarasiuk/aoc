import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2024, day: 10});

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

const grid = input.split(/\n/).map(([...l]) => l.map(Number));

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
  .reduce((a, b) => a + b);

const totalRating = Object.keys(trailheadRatings)
  .map(id => trailheadRatings[id].length)
  .reduce((a, b) => a + b);

assert.strictEqual(totalScore, 548, 'Part 1 failed');
assert.strictEqual(totalRating, 1252, 'Part 2 failed');
