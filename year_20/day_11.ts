import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2020, day: 11});

const Seats = {empty: 'L', occupied: '#', floor: '.'};

function getAdjacentSeats(seats: string[][], {x, y}: {x: number; y: number}) {
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
  return AdjacentOffsets.flatMap(
    ([offsetY, offsetX]) => seats[y + offsetY]?.[x + offsetX] ?? []
  );
}
function countOccupiedSeats(seats: string[]) {
  return seats.filter(seat => seat === Seats.occupied).length;
}
function getNewSeat(seat: string, adjacents: string[]) {
  const occupiedSeatsCount = countOccupiedSeats(adjacents);
  if (seat === Seats.empty && occupiedSeatsCount === 0) {
    return Seats.occupied;
  } else if (seat === Seats.occupied && occupiedSeatsCount >= 4) {
    return Seats.empty;
  } else {
    return seat;
  }
}

let changed = true;
let currentSeats = input.split(/\n/).map(([...l]) => l);
while (changed) {
  const newSeats = currentSeats.map((row, y) =>
    row.map((seat, x) =>
      getNewSeat(seat, getAdjacentSeats(currentSeats, {x, y}))
    )
  );
  changed = newSeats.flat().join('') !== currentSeats.flat().join('');
  currentSeats = newSeats;
}
const occupiedSeatsCount = countOccupiedSeats(currentSeats.flat());

assert.strictEqual(occupiedSeatsCount, 2483, 'Part 1 failed');
