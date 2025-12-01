import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 1});

const rotations = input.split(/\n/).map(([direction, ...distance]) => ({
  direction,
  distance: Number(distance.join('')),
}));

let dial = 50;
let timesAtZero = 0;
for (const {direction, distance} of rotations) {
  dial += direction === 'L' ? -distance : distance;
  dial = ((dial % 100) + 100) % 100;
  if (dial === 0) {
    timesAtZero++;
  }
}

assert.strictEqual(timesAtZero, 1102, 'Part 1 failed');
