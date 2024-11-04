import {getInputParagraphs} from 'lib/input.js';
import {matchInts} from 'lib/parse.js';
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

const categoryLayers = categoryMaps.map(([, ...map]) => map.map(matchInts));
const lowestConvertedLocation = Math.min(
  ...matchInts(initialSeeds).map(seed =>
    mapThroughCategories(categoryLayers, seed)
  )
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(lowestConvertedLocation).toBe(323142486));
}
