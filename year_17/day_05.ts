import {getInputInts} from 'lib/input';

const ints = await getInputInts({year: 2017, day: 5});

function calcSteps(
  [...offsets]: number[],
  jump: (offsets: number[], offset: number) => number
) {
  let offset = 0;
  let steps = 0;

  while (offset < offsets.length) {
    offset += jump(offsets, offset);
    steps++;
  }
  return steps;
}

const steps = calcSteps(ints, (offsets, offset) => offsets[offset]++);
const steps2 = calcSteps(ints, (offsets, offset) =>
  offsets[offset] >= 3 ? offsets[offset]-- : offsets[offset]++
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(steps).toBe(373160);
  });

  test('part 2', () => {
    expect(steps2).toBe(26395586);
  });
}
