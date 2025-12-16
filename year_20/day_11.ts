import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2020, day: 11});

const SEAT = {
  empty: 'L',
  occupied: '#',
  floor: '.',
};

const ADJACENT_OFFSETS = [
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
  return ADJACENT_OFFSETS.flatMap(([dy, dx]) => grid[y + dy]?.[x + dx] ?? []);
}

function countOccupiedSeats(seats: string[]) {
  return seats.filter(s => s === SEAT.occupied).length;
}

function getNextSeatState(seatState: string, neighbors: string[]) {
  const occupiedCount = countOccupiedSeats(neighbors);
  if (seatState === SEAT.empty && occupiedCount === 0) {
    return SEAT.occupied;
  } else if (seatState === SEAT.occupied && occupiedCount >= 4) {
    return SEAT.empty;
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
