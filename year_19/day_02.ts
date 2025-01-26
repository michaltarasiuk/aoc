import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const ints = await getInputInts({year: 2019, day: 2});

ints[1] = 12;
ints[2] = 2;

for (let i = 0; i < ints.length; i += 4) {
  const opcode = ints[i];
  if (opcode === 99) {
    break;
  }
  const a = ints[ints[i + 1]];
  const b = ints[ints[i + 2]];
  const c = ints[i + 3];
  if (opcode === 1) {
    ints[c] = a + b;
  } else if (opcode === 2) {
    ints[c] = a * b;
  }
}

assert.strictEqual(ints[0], 3306701, 'Part 1 failed');
