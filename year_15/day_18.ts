import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 18});

type LightGrid = typeof initialGrid;

const ON = '#';
const OFF = '.';

const adjacentOffsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function getNeighbors(grid: LightGrid, {x, y}: {x: number; y: number}) {
  return adjacentOffsets.map(([dy, dx]) => grid[y + dy]?.[x + dx] ?? OFF);
}

function computeNextState(current: string, neighbors: string[]) {
  const onCount = neighbors.filter(n => n === ON).length;
  if (current === ON) {
    return onCount === 2 || onCount === 3 ? ON : OFF;
  } else {
    return onCount === 3 ? ON : OFF;
  }
}

const STEPS = 100;

const initialGrid = input.split(/\n/).map(r => [...r]);
let grid = initialGrid;
for (let step = 0; step < STEPS; step++) {
  grid = grid.map((r, y) =>
    r.map((v, x) => computeNextState(v, getNeighbors(grid, {x, y})))
  );
}
const totalOn = grid.flat().filter(cell => cell === ON).length;

assert.strictEqual(totalOn, 821, 'Part 1 failed');
