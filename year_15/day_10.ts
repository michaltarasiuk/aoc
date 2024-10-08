import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

const ProcessCount = 40;
const ProcessCount2 = 50;

let sequence = input;
let count = 0;

const results: number[] = [];

while (++count <= ProcessCount2) {
  const repeatedDigitsRe = /(?:(\d)\1*)/g;

  sequence = (sequence.match(repeatedDigitsRe) ?? [])
    .map(([...digits]) => digits.length + digits[0])
    .join('');

  if (count === ProcessCount || count === ProcessCount2) {
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
