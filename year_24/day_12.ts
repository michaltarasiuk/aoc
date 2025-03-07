import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2024, day: 12});

const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function* exploreRegion(
  grid: string[][],
  plantType: string,
  x: number,
  y: number,
  seen = new Set<string>()
): Generator<[string, number]> {
  seen.add(`${x},${y}`);
  let perimeter = 0;
  for (const [dx, dy] of Directions) {
    const i = x + dx;
    const j = y + dy;
    if (!seen.has(`${i},${j}`)) {
      if (grid[j]?.[i] === plantType) {
        yield* exploreRegion(grid, plantType, i, j, seen);
      } else {
        perimeter++;
      }
    }
  }
  yield [`${x},${y}`, perimeter];
}

const grid = input.split(/\n/).map(([...l]) => l);

const visted = new Set<string>();
let totalCost = 0;
for (const [y, row] of grid.entries()) {
  for (const [x, plantType] of row.entries()) {
    if (visted.has(`${x},${y}`)) {
      continue;
    }
    const region = [...exploreRegion(grid, plantType, x, y)];
    const regionPerimeter = region.reduce(
      (acc, [, perimeter]) => acc + perimeter,
      0
    );
    totalCost += region.length * regionPerimeter;
    region.forEach(([coord]) => visted.add(coord));
  }
}

assert.strictEqual(totalCost, 1546338, 'Part 1 failed');
