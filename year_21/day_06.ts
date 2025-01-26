import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const lanternfishes = await getInputInts({year: 2021, day: 6});

for (let i = 1; i <= 80; i++) {
  for (const [j, fish] of [...lanternfishes].entries()) {
    lanternfishes[j] = fish === 0 ? (lanternfishes.push(8), 6) : fish - 1;
  }
}

assert.strictEqual(lanternfishes.length, 385391, 'Part 1');
