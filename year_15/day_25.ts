import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2015, day: 25});

const [row, col] = input.match(/\d+/g)!.map(Number);

let code = 20151125;
for (let i = 0; i < ((row + col) * (row + col - 1)) / 2 - row; i++) {
  code = (code * 252533) % 33554393;
}

assert.strictEqual(code, 9132360, 'Part 1 failed');
