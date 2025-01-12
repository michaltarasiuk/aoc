import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {divisors} from 'lib/math.js';

const target = await getInput({year: 2015, day: 20});

const PresentsPerHouse = 10;

let houseNumber = 1;
while (true) {
  const housePresents = divisors(houseNumber).reduce(
    (sum, elf) => sum + elf * PresentsPerHouse,
    0
  );
  if (housePresents >= Number(target)) {
    break;
  } else {
    houseNumber++;
  }
}

assert.strictEqual(houseNumber, 665280, 'Part 1 failed');
