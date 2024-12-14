import assert from 'node:assert';

import {getInputIntegers} from 'lib/input.js';

const [targetRow, targetCol] = await getInputIntegers({year: 2015, day: 25});

function calcSteps(row: number, col: number) {
  const diagonalSum = row + col;
  return (diagonalSum * (diagonalSum - 1)) / 2 - row;
}
function calcNewCode(oldCode = 20151125) {
  return (oldCode * 252533) % 33554393;
}

let code: number | undefined;
for (let i = 0; i < calcSteps(targetRow, targetCol); i++) {
  code = calcNewCode(code);
}

assert.strictEqual(code, 9132360, 'Part 1 failed');
