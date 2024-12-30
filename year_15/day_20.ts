import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 20});

function* divisors(n: number) {
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) yield i;
  }
  yield n;
}

let i = 0;
const houses: Record<number, number> = {};

outer: while (++i) {
  for (const j of divisors(i)) {
    houses[i] = (houses[i] ?? 0) + 10 * j;
    if (houses[i] >= Number(input)) {
      break outer;
    }
  }
}

assert.strictEqual(i, 665280, 'Part 1 failed');
