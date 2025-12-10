import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2020, day: 11});

const seat = {
  Empty: 'L',
  Occupied: '#',
  Floor: '.',
};

const neighborOffsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function getAdjacentSeats(grid: string[][], {x, y}: {x: number; y: number}) {
  return neighborOffsets.flatMap(([dy, dx]) => grid[y + dy]?.[x + dx] ?? []);
}

function countOccupiedSeats(seats: string[]) {
  return seats.filter(s => s === seat.Occupied).length;
}

function getNextSeatState(seatState: string, neighbors: string[]) {
  const occupiedCount = countOccupiedSeats(neighbors);
  if (seatState === seat.Empty && occupiedCount === 0) {
    return seat.Occupied;
  } else if (seatState === seat.Occupied && occupiedCount >= 4) {
    return seat.Empty;
  } else {
    return seatState;
  }
}

let changed = true;
let grid = input.split(/\n/).map(l => [...l]);
while (changed) {
  const nextGridState = grid.map((r, y) =>
    r.map((v, x) => getNextSeatState(v, getAdjacentSeats(grid, {x, y})))
  );
  changed = nextGridState.flat().join('') !== grid.flat().join('');
  grid = nextGridState;
}
const finalOccupiedCount = countOccupiedSeats(grid.flat());

assert.strictEqual(finalOccupiedCount, 2483, 'Part 1 failed');
