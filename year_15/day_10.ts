import {getInput} from 'lib/input';

let input = await getInput({year: 2015, day: 10});
let count = 0;

const PROCESS_COUNT = 40;
const PROCESS_COUNT_2 = 50;

const repeatedDigitsRe = /(?:(\d)\1*)/g;
const results: number[] = [];

while (++count <= PROCESS_COUNT_2) {
  const match = input.match(repeatedDigitsRe)!;

  input = match
    .map(([...digits]) => {
      return digits.length + digits[0];
    })
    .join('');

  if (count === PROCESS_COUNT || count === PROCESS_COUNT_2) {
    results.push(input.length);
  }
}

const [result, result2] = results;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(492982);
  });

  test('part 2', () => {
    expect(result2).toBe(6989950);
  });
}
