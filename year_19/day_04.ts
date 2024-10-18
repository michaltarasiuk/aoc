import {getInput} from 'lib/input.js';

const input = await getInput({year: 2019, day: 4});

const [start, end] = input.matchAll(/\d+/g).map(([n]) => Number(n));
const twoAdjacentDigitsRe = /(\d)\1/;

let passwordsCount = 0;
for (let i = start; i <= end; i++) {
  const s = String(i);

  if (twoAdjacentDigitsRe.test(s) && s === Array.from(s).toSorted().join('')) {
    passwordsCount++;
  }
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(passwordsCount).toBe(1686);
  });
}
