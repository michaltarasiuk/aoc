import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2015, day: 25});

function calcSteps(row: number, col: number) {
  return ((row + col) * (row + col - 1)) / 2 - row;
}
function calcNewCode(oldCode = 20151125) {
  return (oldCode * 252533) % 33554393;
}

const inputRe = /row (\d+), column (\d+)/;
const [, row, col] = (input.match(inputRe) ?? []).map(Number);

let code: number | undefined;
for (let i = 0; i < calcSteps(row, col); i++) {
  code = calcNewCode(code);
}

assert.strictEqual(code, 9132360, 'Part 1 failed');
