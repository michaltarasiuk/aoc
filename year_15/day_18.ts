import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 18});

type LightGrid = typeof initialGrid;

const On = '#';
const Off = '.';

const AdjacentOffsets = [
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
  return AdjacentOffsets.map(([dy, dx]) => grid[y + dy]?.[x + dx] ?? Off);
}

function computeNextState(current: string, neighbors: string[]) {
  const onCount = neighbors.filter(n => n === On).length;
  if (current === On) {
    return onCount === 2 || onCount === 3 ? On : Off;
  } else {
    return onCount === 3 ? On : Off;
  }
}

const Steps = 100;

const initialGrid = input.split(/\n/).map(row => [...row]);
let grid = initialGrid;
for (let step = 0; step < Steps; step++) {
  grid = grid.map((row, y) =>
    row.map((cell, x) => computeNextState(cell, getNeighbors(grid, {x, y})))
  );
}
const totalOn = grid.flat().filter(cell => cell === On).length;

assert.strictEqual(totalOn, 821, 'Part 1 failed');
