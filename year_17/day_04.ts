import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2017, day: 4});

const validPassphrasesCount = lines.reduce((acc, line) => {
  const words = line.split(/\s/);
  const uniqueWords = new Set(words);

  if (words.length === uniqueWords.size) {
    acc++;
  }
  return acc;
}, 0);

const validPassphrasesCount2 = lines.reduce((acc, line) => {
  const words = line.split(/\s/);
  const uniqueWords = new Set(
    words.map(([...chars]) => chars.toSorted().join('')),
  );

  if (words.length === uniqueWords.size) {
    acc++;
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPassphrasesCount).toBe(455);
  });

  test('part 2', () => {
    expect(validPassphrasesCount2).toBe(186);
  });
}
