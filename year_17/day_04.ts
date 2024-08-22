import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2017, day: 4});

function countValidPassports(
  lines: string[],
  isValid: (...words: string[]) => boolean,
) {
  return lines.reduce((acc, line) => {
    if (isValid(...line.split(/\s/))) {
      acc++;
    }
    return acc;
  }, 0);
}

const validPassphrasesCount = countValidPassports(lines, (...words) => {
  const uniqWords = new Set(words);
  return words.length === uniqWords.size;
});

const validPassphrasesCount2 = countValidPassports(lines, (...words) => {
  const uniqueWords = new Set(
    words.map(([...chars]) => chars.toSorted().join('')),
  );
  return words.length === uniqueWords.size;
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
