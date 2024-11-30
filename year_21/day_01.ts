import assert from 'node:assert';

import {getInputNumbers} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputNumbers({year: 2021, day: 1});

const increasingMeasurementsCount = sum(
  ...ns.map((n, i) => Number(n > ns[i - 1]))
);
const increasingMeasurementsSumCount = sum(
  ...ns.map((n, i) => Number(n > ns[i - 3]))
);

assert.strictEqual(increasingMeasurementsCount, 1559, 'Part 1 failed');
assert.strictEqual(increasingMeasurementsSumCount, 1600, 'Part 2 failed');
