import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 4});

const Roll = '@';
const MaxAdjacentRolls = 4;
const Directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const grid = input.split(/\n/).map(l => [...l]);

const accessibleRolls = grid
  .flatMap((r, y) => r.map((c, x) => ({c, x, y})))
  .filter(({c}) => c === Roll)
  .filter(({x, y}) => {
    const adjacentRolls = Directions.reduce(
      (count, [i, j]) => count + (grid[y + j]?.[x + i] === Roll ? 1 : 0),
      0
    );
    return adjacentRolls < MaxAdjacentRolls;
  });

assert.strictEqual(accessibleRolls.length, 1409, 'Part 1 failed');
