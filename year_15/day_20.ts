import {divisors} from 'lib/divisors';
import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 20});

const houses: {[k: number]: number} = {};
let i = 0;

outer: while (++i) {
  for (const j of divisors(i)) {
    houses[i] ??= 0;
    houses[i] += 10 * j;

    if (houses[i] >= Number(input)) {
      break outer;
    }
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(i).toBe(665280);
  });
}
