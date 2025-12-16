import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 4});

const PAPER_ROLL = '@';
const MAX_ADJACENT_ROLLS_FOR_ACCESS = 4;
const ADJACENT_DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function isPaperRoll(v: string) {
  return v === PAPER_ROLL;
}

function isAccessibleByForklift(grid: string[][], x: number, y: number) {
  const adjacentRollCount = ADJACENT_DIRECTIONS.reduce(
    (count, [i, j]) => count + Number(isPaperRoll(grid[y + j]?.[x + i])),
    0
  );
  return adjacentRollCount < MAX_ADJACENT_ROLLS_FOR_ACCESS;
}

function getRolls(grid: string[][]) {
  const rolls: [x: number, y: number][] = [];
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      if (isPaperRoll(grid[y][x])) {
        rolls.push([x, y]);
      }
    }
  }
  return rolls;
}

const grid = input.split(/\n/).map(l => [...l]);
const initialAccessibleRolls = getRolls(grid).filter(r =>
  isAccessibleByForklift(grid, ...r)
);

let totalRollsRemoved = 0;
while (true) {
  const accessibleRolls = getRolls(grid).filter(r =>
    isAccessibleByForklift(grid, ...r)
  );
  if (accessibleRolls.length === 0) {
    break;
  }
  for (const [x, y] of accessibleRolls) {
    grid[y][x] = '.';
  }
  totalRollsRemoved += accessibleRolls.length;
}

assert.strictEqual(initialAccessibleRolls.length, 1409, 'Part 1 failed');
assert.strictEqual(totalRollsRemoved, 8366, 'Part 2 failed');
