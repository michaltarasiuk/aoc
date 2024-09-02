import {getInputInts} from 'lib/input';

const ints = await getInputInts({year: 2017, day: 5});

function calcStepsToExit(
  [...offsets]: number[],
  jump: (offsets: number[], offset: number) => number,
) {
  let offset = 0;
  let steps = 0;

  while (offset < offsets.length) {
    offset += jump(offsets, offset);
    steps++;
  }
  return steps;
}

const stepsToExit = calcStepsToExit(
  ints,
  (offsets, offset) => offsets[offset]++,
);
const stepsToExit2 = calcStepsToExit(ints, (offsets, offset) =>
  offsets[offset] >= 3 ? offsets[offset]-- : offsets[offset]++,
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
