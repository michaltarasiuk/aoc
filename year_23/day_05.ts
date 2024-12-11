import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {extractIntegers} from 'lib/parse.js';
import {isDefined} from 'lib/predicate.js';

const [[initialSeeds], ...categoryMaps] = await getInputParagraphs({
  year: 2023,
  day: 5,
});

function mapThroughCategories(
  [...categoryLayers]: number[][][],
  value: number
): number {
  const categoryLayer = categoryLayers.shift();
  if (!isDefined(categoryLayer)) {
    return value;
  }
  for (const [destinationStart, sourceStart, rangeLength] of categoryLayer) {
    if (value >= sourceStart && value < sourceStart + rangeLength) {
      return mapThroughCategories(
        categoryLayers,
        destinationStart + (value - sourceStart)
      );
    }
  }
  return mapThroughCategories(categoryLayers, value);
}

const categoryLayers = categoryMaps
  .map(([, ...layer]) => layer)
  .map(layer => layer.map(l => extractIntegers(l)));
const lowestConvertedLocation = Math.min(
  ...extractIntegers(initialSeeds).map(seed =>
    mapThroughCategories(categoryLayers, seed)
  )
);

assert.strictEqual(lowestConvertedLocation, 323142486, 'Part 1 failed');
