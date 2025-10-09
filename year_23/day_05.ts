import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2023, day: 5});

function mapValueThroughLayers(
  [...conversionLayers]: number[][][],
  value: number
) {
  const currentLayer = conversionLayers.shift();
  if (!isDefined(currentLayer)) {
    return value;
  }
  for (const [destStart, srcStart, length] of currentLayer) {
    if (value >= srcStart && value < srcStart + length) {
      return mapValueThroughLayers(
        conversionLayers,
        destStart + (value - srcStart)
      );
    }
  }
  return mapValueThroughLayers(conversionLayers, value);
}

const [seedRanges, ...conversionMaps] = input.split(/\n\n/);

const conversionLayers = conversionMaps
  .map(map => map.split(/\n/).slice(1))
  .map(layer => layer.map(l => l.split(/\s+/).map(Number)));

const minLocation = Math.min(
  ...seedRanges
    .replace(/^seeds: /, '')
    .split(/\s+/)
    .map(Number)
    .map(seed => mapValueThroughLayers(conversionLayers, Number(seed)))
);

assert.strictEqual(minLocation, 323142486, 'Part 1 failed');
