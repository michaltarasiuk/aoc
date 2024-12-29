import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {divisors} from 'lib/math.js';

const input = await getInput({year: 2015, day: 20});

const houses: Record<number, number> = {};

let i = 0;
outer: while (++i) {
  for (const j of divisors(i)) {
    houses[i] = (houses[i] ?? 0) + 10 * j;
    if (houses[i] >= Number(input)) {
      break outer;
    }
  }
}

assert.strictEqual(i, 665280, 'Part 1 failed');
