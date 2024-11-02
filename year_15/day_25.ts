import {getInputInts} from 'lib/input.js';

const [targetRow, targetCol] = await getInputInts({year: 2015, day: 25});

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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(code).toBe(9132360));
}
