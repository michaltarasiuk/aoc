import assert from 'node:assert';

import {divisors} from '#lib/divisors.js';
import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2015, day: 20});

const PRESENTS_PER_HOUSE = 10;

let houseNumber = 1;
while (true) {
  const housePresents = divisors(houseNumber).reduce(
    (sum, elf) => sum + elf * PRESENTS_PER_HOUSE,
    0
  );
  if (housePresents >= Number(input)) {
    break;
  } else {
    houseNumber++;
  }
}

assert.strictEqual(houseNumber, 665280, 'Part 1 failed');
