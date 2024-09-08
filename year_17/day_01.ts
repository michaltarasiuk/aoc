import {getInput} from 'lib/input.js';
import {sum} from 'lib/math.js';

const input = await getInput({year: 2017, day: 1});

const ns = Array.from(input, Number);

const captchaSolution = sum(
  ...ns.filter((n, i) => n === ns.at((i + 1) % ns.length))
);
const captchaSolution2 = sum(
  ...ns.filter((n, i) => n === ns.at((i + ns.length / 2) % ns.length))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(captchaSolution).toBe(1203);
  });

  test('part 2', () => {
    expect(captchaSolution2).toBe(1146);
  });
}
