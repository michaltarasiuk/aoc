import assert from 'node:assert';

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

assert.strictEqual(visitedHouses.length, 2565, 'Part 1 failed');
assert.strictEqual(visitedHousesWithRoboSanta.length, 2639, 'Part 2 failed');
