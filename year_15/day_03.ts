import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2015, day: 3});

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
  const visited = new Set();
  for (const dir of input) {
    visited.add(santa.move(dir).toString());
  }
  return visited;
})();

const visitedHousesWithRoboSanta = (() => {
  const santas = [createPosition(), createPosition()];
  const visited = new Set();
  for (const [i, dir] of [...input].entries()) {
    visited.add(santas[i % 2].move(dir).toString());
  }
  return visited;
})();

assert.strictEqual(visitedHouses.size, 2565, 'Part 1 failed');
assert.strictEqual(visitedHousesWithRoboSanta.size, 2639, 'Part 2 failed');
