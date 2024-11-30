import assert from 'node:assert';

import {getInputNumbers} from 'lib/input.js';

const ns = await getInputNumbers({year: 2017, day: 5});

const steps = (() => {
  const offsets = ns.slice();
  let index = 0;
  let steps = 0;

  while (index < offsets.length) {
    index += offsets[index]++;
    steps++;
  }
  return steps;
})();

const steps2 = (() => {
  const offsets = ns.slice();
  let index = 0;
  let steps = 0;

  while (index < offsets.length) {
    index += offsets[index] >= 3 ? offsets[index]-- : offsets[index]++;
    steps++;
  }
  return steps;
})();

assert.strictEqual(steps, 373160, 'Part 1 failed');
assert.strictEqual(steps2, 26395586, 'Part 2 failed');
