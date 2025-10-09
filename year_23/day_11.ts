import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2023, day: 11});

const Galaxy = '#';
const EmptySpace = '.';

function isEmptySpace(...space: string[]) {
  return space.join('').replaceAll(EmptySpace, '').length === 0;
}

const image = input.split(/\n/).map(([...l]) => l);
assert(image.length === image[0].length, 'Image is not square');

const expandedImage = structuredClone(image);
const rowKeys = expandedImage.keys();
while (true) {
  const k = rowKeys.next();
  if (k.done) break;
  if (isEmptySpace(...expandedImage[k.value])) {
    expandedImage.splice(k.value, 0, Array(image.length).fill(EmptySpace));
    rowKeys.next();
  }
}
const colKeys = expandedImage[0].keys();
while (true) {
  const k = colKeys.next();
  if (k.done) break;
  if (isEmptySpace(...expandedImage.map(l => l[k.value]))) {
    for (const l of expandedImage) {
      l.splice(k.value, 0, EmptySpace);
    }
    colKeys.next();
  }
}

const galaxies = expandedImage
  .flatMap((l, y) => [...l.keys()].map(x => [x, y]))
  .filter(([x, y]) => expandedImage[y][x] === Galaxy);

let totalDistance = 0;
for (const [index, [x, y]] of galaxies.entries()) {
  for (const [i, j] of galaxies.slice(index + 1)) {
    totalDistance += Math.abs(x - i) + Math.abs(y - j);
  }
}

assert.strictEqual(totalDistance, 9550717, 'Part 1 failed');
