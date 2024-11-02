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

function countVisitedHouses() {
  const santa = createPosition();
  const visitedHouses = uniq(
    Array.from(input, direction => santa.move(direction).toString())
  );
  return visitedHouses.length;
}

function countVisitedHousesWithRoboSanta() {
  const santas = [createPosition(), createPosition()];
  const visitedHouses = uniq(
    Array.from(input, (direction, index) =>
      santas[index % 2].move(direction).toString()
    )
  );
  return visitedHouses.length;
}

const visitedHousesCount = countVisitedHouses();
const visitedHousesCountWithRoboSanta = countVisitedHousesWithRoboSanta();

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(visitedHousesCount).toBe(2565));
  test('part 2', () => expect(visitedHousesCountWithRoboSanta).toBe(2639));
}
