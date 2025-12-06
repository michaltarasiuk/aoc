import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2020, day: 3});

const Tree = '#';
const Slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
] satisfies [number, number][];

function countTrees(toboggan: string[], slope: (typeof Slopes)[number]) {
  let trees = 0;
  let [x, y] = [0, 0];
  while (y < toboggan.length - 1) {
    [x, y] = [(x + slope[0]) % toboggan[0].length, y + slope[1]];
    if (toboggan[y][x] === Tree) {
      trees++;
    }
  }
  return trees;
}

const toboggan = input.split(/\n/);

const treesForSlope = countTrees(toboggan, Slopes[1]);
const multipliedTrees = Slopes.reduce(
  (acc, slope) => acc * countTrees(toboggan, slope),
  1
);

assert.strictEqual(treesForSlope, 169, 'Part 1 failed');
assert.strictEqual(multipliedTrees, 7560370818, 'Part 2 failed');
