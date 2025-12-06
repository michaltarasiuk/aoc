import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2021, day: 7});

function* getPositionRange(positions: number[]) {
  for (let i = Math.min(...positions); i <= Math.max(...positions); i++) {
    yield i;
  }
}

const positions = input.split(',').map(Number);

const fuelsPart1 = getPositionRange(positions).map(t =>
  positions.reduce((acc, p) => acc + Math.abs(p - t), 0)
);

const fuelsPart2 = getPositionRange(positions).map(t =>
  positions.reduce(
    (acc, p) => acc + (Math.abs(p - t) * (Math.abs(p - t) + 1)) / 2,
    0
  )
);

assert.strictEqual(Math.min(...fuelsPart1), 331067, 'Part 1 failed');
assert.strictEqual(Math.min(...fuelsPart2), 92881128, 'Part 2 failed');
