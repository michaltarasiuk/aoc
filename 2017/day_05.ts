import {getInputInts} from 'lib/input';

const ints = await getInputInts({year: 2017, day: 5});

function calcStepsToExit(
  [...ints]: number[],
  jump: (ints: number[], offset: number) => number,
) {
  let offset = 0;
  let steps = 0;

  while (offset < ints.length) {
    offset += jump(ints, offset);
    steps++;
  }
  return steps;
}

const stepsToExit = calcStepsToExit(ints, (ints, offset) => ints[offset]++);
const stepsToExit2 = calcStepsToExit(ints, (ints, offset) =>
  ints[offset] >= 3 ? ints[offset]-- : ints[offset]++,
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(stepsToExit).toBe(373160);
  });

  test('part 2', () => {
    expect(stepsToExit2).toBe(26395586);
  });
}
