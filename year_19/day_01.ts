import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const ns = await getInputInts({year: 2019, day: 1});

const fuelRequirementsSum = ns
  .map(n => Math.floor(n / 3) - 2)
  .reduce((a, b) => a + b);

assert.strictEqual(fuelRequirementsSum, 3273715, 'Part 1 failed');
