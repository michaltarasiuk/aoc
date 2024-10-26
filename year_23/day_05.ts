import {getInputParagraphs} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';
import {isDefined} from 'lib/predicate.js';

const [[initialSeeds], ...categoryMaps] = await getInputParagraphs({
  year: 2023,
  day: 5,
});

function convertThroughCategories(
  [...categoryLayers]: number[][][],
  value: number
): number {
  const categoryLayer = categoryLayers.shift();
  if (!isDefined(categoryLayer)) {
    return value;
  }

  for (const [destinationStart, sourceStart, rangeLength] of categoryLayer) {
    if (value >= sourceStart && value < sourceStart + rangeLength) {
      return convertThroughCategories(
        categoryLayers,
        destinationStart + (value - sourceStart)
      );
    }
  }
  return convertThroughCategories(categoryLayers, value);
}

const categoryLayers = categoryMaps.map(([, ...map]) => map.map(extractInts));
const lowestConvertedLocation = Math.min(
  ...extractInts(initialSeeds).map(seed =>
    convertThroughCategories(categoryLayers, seed)
  )
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(lowestConvertedLocation).toBe(323142486);
  });
}
