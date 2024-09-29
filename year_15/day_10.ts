import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

function matchRepeatedDigits(s: string) {
  const repeatedDigitsRe = /(?:(\d)\1*)/g;
  return s.match(repeatedDigitsRe) ?? [];
}

const PROCESS_COUNT = 40;
const PROCESS_COUNT_2 = 50;

let sequence = input;
let count = 0;

const results: number[] = [];

while (++count <= PROCESS_COUNT_2) {
  sequence = matchRepeatedDigits(sequence)
    .map(([...digits]) => digits.length + digits[0])
    .join('');

  if (count === PROCESS_COUNT || count === PROCESS_COUNT_2) {
    results.push(sequence.length);
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(results[0]).toBe(492982);
  });

  test('part 2', () => {
    expect(results[1]).toBe(6989950);
  });
}
