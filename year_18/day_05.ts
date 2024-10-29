import {getInput} from 'lib/input.js';

const input = await getInput({year: 2018, day: 5});

const polymerRe = /(\w)(\1)/gi;

let exec: RegExpExecArray | null;
let units = input;
while ((exec = polymerRe.exec(units))) {
  const [match, a, b] = exec;
  if (a !== b) {
    units = units.replace(match, '');
    polymerRe.lastIndex = 0;
  } else {
    polymerRe.lastIndex--;
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(units.length).toBe(10972);
  });
}
