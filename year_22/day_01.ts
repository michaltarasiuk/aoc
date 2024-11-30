import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {sum} from 'lib/math.js';

const paragraphs = await getInputParagraphs({year: 2022, day: 1});

const elfs = paragraphs
  .map(paragraph => sum(...paragraph.map(Number)))
  .toSorted((a, b) => b - a);

const maxCalories = elfs[0];
const caloriesOfTopThreeElves = elfs[0] + elfs[1] + elfs[2];

assert.strictEqual(maxCalories, 66306, 'Part 1 failed');
assert.strictEqual(caloriesOfTopThreeElves, 195292, 'Part 2 failed');
