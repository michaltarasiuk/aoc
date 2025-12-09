import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2020, day: 11});

const Seat = {
  Empty: 'L',
  Occupied: '#',
  Floor: '.',
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
function getAdjacentSeats(grid: string[][], {x, y}: {x: number; y: number}) {
  return NeighborOffsets.flatMap(([dy, dx]) => grid[y + dy]?.[x + dx] ?? []);
}

function countOccupiedSeats(seats: string[]) {
  return seats.filter(seat => seat === Seat.Occupied).length;
}

function getNextSeatState(seat: string, neighbors: string[]) {
  const occupiedCount = countOccupiedSeats(neighbors);
  if (seat === Seat.Empty && occupiedCount === 0) {
    return Seat.Occupied;
  } else if (seat === Seat.Occupied && occupiedCount >= 4) {
    return Seat.Empty;
  } else {
    return seat;
  }
}

let changed = true;
let grid = input.split(/\n/).map(([...l]) => l);
while (changed) {
  const nextGridState = grid.map((r, y) =>
    r.map((v, x) => getNextSeatState(v, getAdjacentSeats(grid, {x, y})))
  );
  changed = nextGridState.flat().join('') !== grid.flat().join('');
  grid = nextGridState;
}
const finalOccupiedCount = countOccupiedSeats(grid.flat());

assert.strictEqual(finalOccupiedCount, 2483, 'Part 1 failed');
