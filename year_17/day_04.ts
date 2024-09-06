import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2017, day: 4});

function countValidPassports<T extends string[]>(
  passports: T[],
  isValid: (...words: T) => boolean
) {
  return sum(...passports.map(passport => Number(isValid(...passport))));
}

const passports = lines.map(line => line.split(/\s/));

const validPassphrasesCount = countValidPassports(passports, (...words) => {
  const uniqWords = new Set(words);
  return words.length === uniqWords.size;
});

const validPassphrasesCount2 = countValidPassports(passports, (...words) => {
  const uniqWords = new Set(
    words.map(([...chars]) => chars.toSorted().join(''))
  );
  return words.length === uniqWords.size;
});

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPassphrasesCount).toBe(455);
  });

  test('part 2', () => {
    expect(validPassphrasesCount2).toBe(186);
  });
}
