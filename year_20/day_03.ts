import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2020, day: 3});

const Tree = '#';
const Slope = [3, 1] as const;

const tobogganMap = input.split('\n').map(([...l]) => l);
const rowLength = tobogganMap[0].length;

let trees = 0;
let [x, y] = [0, 0];
while (y !== tobogganMap.length - 1) {
  [x, y] = [(x + Slope[0]) % rowLength, y + Slope[1]];
  if (tobogganMap[y][x] === Tree) {
    trees++;
  }
}

assert.strictEqual(trees, 169, 'Part 1 failed');
