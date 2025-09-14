import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const Input = await readInput({year: 2015, day: 18});

type Grid = typeof grid;

const LightOn = '#';
const LightOff = '.';

const NeighborOffsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function getAdjacentCells(grid: Grid, {x, y}: {x: number; y: number}) {
  return NeighborOffsets.map(([dy, dx]) => grid[y + dy]?.[x + dx] ?? LightOff);
}

function getNextCellState(cell: string, neighbors: string[]) {
  const onCount = neighbors.filter(n => n === LightOn).length;
  if (cell === LightOn) {
    return onCount === 2 || onCount === 3 ? LightOn : LightOff;
  } else {
    return onCount === 3 ? LightOn : LightOff;
  }
}

const Steps = 100;

let grid = Input.split(/\n/).map(row => [...row]);
for (let step = 0; step < Steps; step++) {
  grid = grid.map((row, y) =>
    row.map((cell, x) => getNextCellState(cell, getAdjacentCells(grid, {x, y})))
  );
}
const lightsOnCount = grid.flat().filter(cell => cell === LightOn).length;

assert.strictEqual(lightsOnCount, 821, 'Part 1 failed');
