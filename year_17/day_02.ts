import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2017, day: 2});

const rows = input.split(/\n/).map(l => l.split(/\s+/).map(Number));

let checksum = 0;
for (const r of rows) {
  checksum += Math.max(...r) - Math.min(...r);
}

let divsum = 0;
for (const r of rows) {
  for (const n1 of r) {
    for (const n2 of r) {
      if (n1 !== n2 && n1 % n2 === 0) {
        divsum += n1 / n2;
      }
    }
  }
}

assert.strictEqual(checksum, 44216, 'Part 1 failed');
assert.strictEqual(divsum, 320, 'Part 2 failed');
