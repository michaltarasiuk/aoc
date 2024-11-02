import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2017, day: 4});

const passports = lines.map(l => l.split(/\s/));

const validPassphrasesCount = sum(
  ...passports
    .map(passport => {
      const uniq = new Set(passport);
      return passport.length === uniq.size;
    })
    .map(Number)
);

const validPassphrasesCount2 = sum(
  ...passports
    .map(passport => {
      const uniq = new Set(
        passport.map(([...chars]) => chars.toSorted().join(''))
      );
      return passport.length === uniq.size;
    })
    .map(Number)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(validPassphrasesCount).toBe(455));
  test('part 2', () => expect(validPassphrasesCount2).toBe(186));
}
