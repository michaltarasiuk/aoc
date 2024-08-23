import {getInputInts} from 'lib/input';

const [row, col] = await getInputInts({year: 2015, day: 25});

function calcSteps(row: number, col: number) {
  const sum = row + col;
  return (sum * (sum - 1)) / 2 - row;
}

function calcCode(prevCode = 20151125) {
  return (prevCode * 252533) % 33554393;
}

let code: number | undefined;
for (let i = 0; i < calcSteps(row, col); i++) {
  code = calcCode(code);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(code).toBe(9132360);
  });
}
