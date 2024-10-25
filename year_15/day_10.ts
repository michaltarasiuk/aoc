import {getInput} from 'lib/input.js';

const input = await getInput({year: 2015, day: 10});

const IterationsPart1 = 40;
const IterationsPart2 = 50;

let currentSequence = input;
let iterationCount = 0;

const sequenceLengths: number[] = [];

while (++iterationCount <= IterationsPart2) {
  const repeatedDigitsPattern = /(?:(\d)\1*)/g;

  currentSequence = (currentSequence.match(repeatedDigitsPattern) ?? [])
    .map(([...digits]) => digits.length + digits[0])
    .join('');

  if (
    iterationCount === IterationsPart1 ||
    iterationCount === IterationsPart2
  ) {
    sequenceLengths.push(currentSequence.length);
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(sequenceLengths[0]).toBe(492982);
  });

  test('part 2', () => {
    expect(sequenceLengths[1]).toBe(6989950);
  });
}
