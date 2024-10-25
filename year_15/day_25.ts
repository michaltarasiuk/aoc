import {getInputInts} from 'lib/input.js';

const [targetRow, targetCol] = await getInputInts({year: 2015, day: 25});

function calculateSteps(row: number, col: number) {
  const diagonalSum = row + col;
  return (diagonalSum * (diagonalSum - 1)) / 2 - row;
}

function generateNextCode(previousCode = 20151125) {
  return (previousCode * 252533) % 33554393;
}

let code: number | undefined;
for (let i = 0; i < calculateSteps(targetRow, targetCol); i++) {
  code = generateNextCode(code);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(code).toBe(9132360);
  });
}
