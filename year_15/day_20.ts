import {getInput} from 'lib/input.js';
import {divisors} from 'lib/math.js';

const input = await getInput({year: 2015, day: 20});

const housePresents: Record<number, number> = {};
let houseNumber = 0;

outer: while (++houseNumber) {
  for (const elf of divisors(houseNumber)) {
    housePresents[houseNumber] = (housePresents[houseNumber] ?? 0) + 10 * elf;

    if (housePresents[houseNumber] >= Number(input)) {
      break outer;
    }
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(houseNumber).toBe(665280);
  });
}
