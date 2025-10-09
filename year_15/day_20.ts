import assert from 'node:assert';

import {divisors} from 'lib/divisors.js';
import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2015, day: 20});

const PresentsPerHouse = 10;

let houseNumber = 1;
while (true) {
  const housePresents = divisors(houseNumber).reduce(
    (sum, elf) => sum + elf * PresentsPerHouse,
    0
  );
  if (housePresents >= Number(input)) {
    break;
  } else {
    houseNumber++;
  }
}

assert.strictEqual(houseNumber, 665280, 'Part 1 failed');
