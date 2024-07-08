import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2017, day: 4});

const result = lns.reduce((acc, ln) => {
  const words = ln.split(' ');
  const uniqueWords = new Set(words);

  if (words.length === uniqueWords.size) {
    acc++;
  }
  return acc;
}, 0);

const result2 = lns.reduce((acc, ln) => {
  const words = ln.split(' ');
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
    expect(result).toBe(455);
  });

  test('part 2', () => {
    expect(result2).toBe(186);
  });
}
