import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 2});

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const X_BOUND = KEYPAD[0].length - 1;
const Y_BOUND = KEYPAD.length - 1;

function move(x: number, y: number, direction: string) {
  switch (direction) {
    case 'U':
      return [x, Math.max(y - 1, 0)];
    case 'D':
      return [x, Math.min(y + 1, Y_BOUND)];
    case 'L':
      return [Math.max(x - 1, 0), y];
    case 'R':
      return [Math.min(x + 1, X_BOUND), y];
    default:
      throw new Error('Invalid direction');
  }
}

const START_POINT = [1, 1];

let [x, y] = START_POINT;
let bathroomCode = '';

for (const ln of lns) {
  for (const char of ln) {
    [x, y] = move(x, y, char);
  }
  bathroomCode += KEYPAD[y][x];
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(bathroomCode).toBe('19636');
  });
}
