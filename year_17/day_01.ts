import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2017, day: 1});

const ns = input.matchAll(/\d/g).map(Number).toArray();

const captchaSolution = ns
  .filter((n, i) => n === ns.at((i + 1) % ns.length))
  .reduce((a, b) => a + b);
const captchaSolution2 = ns
  .filter((n, i) => n === ns.at((i + ns.length / 2) % ns.length))
  .reduce((a, b) => a + b);

assert.strictEqual(captchaSolution, 1203, 'Part 1 failed');
assert.strictEqual(captchaSolution2, 1146, 'Part 2 solution is incorrect');
