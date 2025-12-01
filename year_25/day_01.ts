import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 1});

const rotations = input.split(/\n/).map(([direction, ...distance]) => ({
  direction,
  distance: Number(distance.join('')),
}));

let dial = 50;
let timesAtZero = 0;
let timesEndedAtZero = 0;
for (const {direction, distance} of rotations) {
  for (let i = 0; i < distance; i++) {
    dial = (dial + (direction === 'L' ? -1 : 1) + 100) % 100;
    if (dial === 0) {
      timesAtZero++;
    }
  }
  if (dial === 0) {
    timesEndedAtZero++;
  }
}

assert.strictEqual(timesEndedAtZero, 1102, 'Part 1 failed');
assert.strictEqual(timesAtZero, 6175, 'Part 2 failed');
