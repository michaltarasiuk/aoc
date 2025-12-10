import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2023, day: 11});

const GALAXY = '#';
const EMPTY_SPACE = '.';

function isEmptySpace(...space: string[]) {
  return space.join('').replaceAll(EMPTY_SPACE, '').length === 0;
}

const image = input.split(/\n/).map(l => [...l]);
assert(image.length === image[0].length, 'Image is not square');

const expandedImage = structuredClone(image);
const rowKeys = expandedImage.keys();
while (true) {
  const k = rowKeys.next();
  if (k.done) break;
  if (isEmptySpace(...expandedImage[k.value])) {
    expandedImage.splice(k.value, 0, Array(image.length).fill(EMPTY_SPACE));
    rowKeys.next();
  }
}
const colKeys = expandedImage[0].keys();
while (true) {
  const k = colKeys.next();
  if (k.done) break;
  if (isEmptySpace(...expandedImage.map(l => l[k.value]))) {
    for (const l of expandedImage) {
      l.splice(k.value, 0, EMPTY_SPACE);
    }
    colKeys.next();
  }
}

const galaxies = expandedImage
  .flatMap((l, y) => [...l.keys()].map(x => [x, y]))
  .filter(([x, y]) => expandedImage[y][x] === GALAXY);

let totalDistance = 0;
for (const [index, [x, y]] of galaxies.entries()) {
  for (const [i, j] of galaxies.slice(index + 1)) {
    totalDistance += Math.abs(x - i) + Math.abs(y - j);
  }
}

assert.strictEqual(totalDistance, 9550717, 'Part 1 failed');
