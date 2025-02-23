import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2021, day: 7});
const positions = input.split(',').map(Number);

let minFuel = Infinity;
for (let i = Math.min(...positions); i <= Math.max(...positions); i++) {
  const fuel = positions.reduce((acc, p) => acc + Math.abs(p - i), 0);
  minFuel = Math.min(minFuel, fuel);
}

assert.strictEqual(minFuel, 331067, 'Part 1 failed');
