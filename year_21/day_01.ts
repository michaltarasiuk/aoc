import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const ns = await getInputInts({year: 2021, day: 1});

const increasingMeasurementsCount = ns
  .map((n, i) => Number(n > ns[i - 1]))
  .reduce((a, b) => a + b);

const increasingMeasurementsSumCount = ns
  .map((n, i) => Number(n > ns[i - 3]))
  .reduce((a, b) => a + b);

assert.strictEqual(increasingMeasurementsCount, 1559, 'Part 1 failed');
assert.strictEqual(increasingMeasurementsSumCount, 1600, 'Part 2 failed');
