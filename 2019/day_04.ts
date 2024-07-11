import {getInput} from 'lib/input';

const input = await getInput({year: 2019, day: 4});

const [start, end] = input.split('-').map(Number);
const twoAdjacentDigitsRe = /(\d)\1/;

let result = 0;

for (let i = start; i <= end; i++) {
  const s = String(i);

  if (twoAdjacentDigitsRe.test(s) && s === Array.from(s).toSorted().join('')) {
    result++;
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(1686);
  });
}
