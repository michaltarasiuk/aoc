import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2016, day: 1});

function createCoords() {
  const dirs = {n: 0, e: 0, s: 0, w: 0};
  const dirKeys = Object.keys(dirs) as (keyof typeof dirs)[];
  let i = 0;

  return {
    getPosition() {
      const {n, e, s, w} = dirs;
      return `${n - s},${e - w}`;
    },
    calcDistance() {
      const {n, e, s, w} = dirs;
      return Math.abs(n - s) + Math.abs(e - w);
    },
    *set(turn: string, steps: number) {
      i = (i + (turn === 'L' ? -1 : 1) + dirKeys.length) % dirKeys.length;
      for (let j = 0; j < steps; j++) {
        dirs[dirKeys[i]]++;
        yield this.getPosition();
      }
    },
  };
}

const instructions = input
  .matchAll(/([LR])(\d+)/g)
  .map(([, turn, steps]) => ({turn, steps: Number(steps)}));

const coords = createCoords();
const visited = new Set<string>();
let firstDuplicate: number | undefined;

for (const {turn, steps} of instructions) {
  for (const position of coords.set(turn, steps)) {
    if (visited.has(position) && !firstDuplicate) {
      firstDuplicate = coords.calcDistance();
    } else {
      visited.add(position);
    }
  }
}

assert.strictEqual(coords.calcDistance(), 273, 'Part 1 failed');
assert.strictEqual(firstDuplicate, 115, 'Part 2 failed');
