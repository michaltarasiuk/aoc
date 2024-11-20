import {getInput} from 'lib/input.js';
import {uniq} from 'lib/iterable.js';

const input = await getInput({year: 2015, day: 3});

function createPosition() {
  let x = 0;
  let y = 0;

  return {
    toString() {
      return `${x},${y}`;
    },
    move(direction: string) {
      x += direction === '>' ? 1 : direction === '<' ? -1 : 0;
      y += direction === '^' ? 1 : direction === 'v' ? -1 : 0;
      return this;
    },
  };
}

const visitedHouses = (() => {
  const santa = createPosition();
  return uniq(Array.from(input, direction => santa.move(direction).toString()));
})();

const visitedHousesWithRoboSanta = (() => {
  const santas = [createPosition(), createPosition()];
  return uniq(
    Array.from(input, (direction, index) =>
      santas[index % 2].move(direction).toString()
    )
  );
})();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(visitedHouses.length).toBe(2565));
  test('part 2', () => expect(visitedHousesWithRoboSanta.length).toBe(2639));
}
