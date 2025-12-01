import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 1});

const rotations = input.split(/\n/).map(([direction, ...distance]) => ({
  direction,
  distance: Number(distance.join('')),
}));

const dial = rotations.reduce((acc, {direction, distance}) => {
  direction === 'L' ? (acc -= distance) : (acc += distance);
  return acc;
}, 50);

assert.strictEqual(dial, NaN, 'Part 1 failed');
