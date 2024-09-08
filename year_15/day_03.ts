import {getInput} from 'lib/input.js';
import {uniq} from 'lib/iterable.js';

const input = await getInput({year: 2015, day: 3});

function createPos() {
  let x = 0;
  let y = 0;

  return {
    toString() {
      return `${x},${y}`;
    },
    set(char: string) {
      x += char === '>' ? 1 : char === '<' ? -1 : 0;
      y += char === '^' ? 1 : char === 'v' ? -1 : 0;

      return this;
    },
  };
}

function getVisitedHousesCount() {
  const santa = createPos();
  const houses = uniq(Array.from(input, char => santa.set(char).toString()));

  return houses.length;
}

function getVisitedHousesCount2() {
  const santas = [createPos(), createPos()];
  const houses = uniq(
    Array.from(input, (char, i) => santas[i % 2].set(char).toString())
  );

  return houses.length;
}

const visitedHousesCount = getVisitedHousesCount();
const visitedHousesCount2 = getVisitedHousesCount2();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(visitedHousesCount).toBe(2565);
  });

  test('part 2', () => {
    expect(visitedHousesCount2).toBe(2639);
  });
}
