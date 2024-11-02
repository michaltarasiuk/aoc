import {getInputInts} from 'lib/input.js';

const ints = await getInputInts({year: 2017, day: 5});

const steps = (() => {
  const offsets = ints.slice();
  let index = 0;
  let steps = 0;

  while (index < offsets.length) {
    index += offsets[index]++;
    steps++;
  }
  return steps;
})();

const steps2 = (() => {
  const offsets = ints.slice();
  let index = 0;
  let steps = 0;

  while (index < offsets.length) {
    index += offsets[index] >= 3 ? offsets[index]-- : offsets[index]++;
    steps++;
  }
  return steps;
})();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(steps).toBe(373160));
  test('part 2', () => expect(steps2).toBe(26395586));
}
