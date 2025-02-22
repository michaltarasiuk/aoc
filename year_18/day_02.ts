import assert from 'node:assert';

import {frequencies} from 'lib/frequencies.js';
import {readInput} from 'lib/input.js';

const input = await readInput({year: 2018, day: 2});

let countOfTwos = 0;
let countOfThrees = 0;
for (const l of input.split(/\n/)) {
  const charCounts = new Map(
    frequencies(l)
      .entries()
      .map(([char, count]) => [count, char])
  );
  if (charCounts.has(2)) countOfTwos++;
  if (charCounts.has(3)) countOfThrees++;
}

const checksum = countOfTwos * countOfThrees;

assert.strictEqual(checksum, 5880, 'Part 1 failed');
