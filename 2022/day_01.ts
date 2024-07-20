import {getInputParagraphs} from 'lib/input';
import {sum} from 'lib/sum';

const paragraphs = await getInputParagraphs({year: 2022, day: 1});

const elfs = paragraphs
  .map((paragraph) => sum(...paragraph.map(Number)))
  .toSorted((a, b) => b - a);

const maxCalories = elfs[0];
const caloriesOfTopThreeElves = elfs[0] + elfs[1] + elfs[2];

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxCalories).toBe(66306);
  });

  test('part 2', () => {
    expect(caloriesOfTopThreeElves).toBe(195292);
  });
}
