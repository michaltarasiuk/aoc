import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2020, day: 11});

const SeatState = {
  empty: 'L',
  occupied: '#',
  floor: '.',
};

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
function getImmediateNeighbors(
  grid: string[][],
  {x, y}: {x: number; y: number}
) {
  return NeighborOffsets.flatMap(([dy, dx]) => grid[y + dy]?.[x + dx] ?? []);
}

function countOccupied(seats: string[]) {
  return seats.filter(seat => seat === SeatState.occupied).length;
}

function nextSeatState(seat: string, neighbors: string[]) {
  const occupiedCount = countOccupied(neighbors);
  if (seat === SeatState.empty && occupiedCount === 0) {
    return SeatState.occupied;
  } else if (seat === SeatState.occupied && occupiedCount >= 4) {
    return SeatState.empty;
  } else {
    return seat;
  }
}

let hasChanged = true;
let seatGrid = input.split(/\n/).map(([...l]) => l);
while (hasChanged) {
  const nextGrid = seatGrid.map((row, y) =>
    row.map((seat, x) =>
      nextSeatState(seat, getImmediateNeighbors(seatGrid, {x, y}))
    )
  );
  hasChanged = nextGrid.flat().join('') !== seatGrid.flat().join('');
  seatGrid = nextGrid;
}
const finalOccupiedCount = countOccupied(seatGrid.flat());

assert.strictEqual(finalOccupiedCount, 2483, 'Part 1 failed');
