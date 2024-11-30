import assert from 'node:assert';

import {getInputNumbers} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputNumbers({year: 2019, day: 1});

const fuelRequirementsSum = sum(...ns.map(n => Math.floor(n / 3) - 2));

assert.strictEqual(fuelRequirementsSum, 3273715, 'Part 1 failed');
