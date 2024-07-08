import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 5});

function sum(...bools: boolean[]) {
  return bools.reduce((acc, bool) => acc + Number(bool), 0);
}

function isNiceString(string: string) {
  const hasAtLeastThreeVowels = /(.*[aeuio].*){3}/.test(string);
  const hasDoubleLetter = /(?:(\w)\1+)/.test(string);
  const hasNoForbiddenSubstrings = !/ab|cd|pq|xy/.test(string);

  return hasAtLeastThreeVowels && hasDoubleLetter && hasNoForbiddenSubstrings;
}

function isNiceString2(string: string) {
  const hasPairOfTwoLetters = /(\w{2}).*\1/.test(string);
  const hasRepeatingLetter = /(\w)\w\1/.test(string);

  return hasPairOfTwoLetters && hasRepeatingLetter;
}

const result = sum(...lns.map(isNiceString));
const result2 = sum(...lns.map(isNiceString2));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(238);
  });

  test('part 2', () => {
    expect(result2).toBe(69);
  });
}
