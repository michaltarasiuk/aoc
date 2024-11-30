import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {sum} from 'lib/math.js';

const input = await getInput({year: 2017, day: 1});

const ns = Array.from(input, Number);

const captchaSolution = sum(
  ...ns.filter((n, i) => n === ns.at((i + 1) % ns.length))
);
const captchaSolution2 = sum(
  ...ns.filter((n, i) => n === ns.at((i + ns.length / 2) % ns.length))
);

assert.strictEqual(captchaSolution, 1203, 'Part 1 failed');
assert.strictEqual(captchaSolution2, 1146, 'Part 2 solution is incorrect');
