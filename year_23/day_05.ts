import assert from 'node:assert';

import {extractInts} from 'lib/extract_ints.js';
import {getInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await getInput({year: 2023, day: 5});

function mapLayers([...layerGroups]: number[][][], value: number): number {
  const layerGroup = layerGroups.shift();
  if (!isDefined(layerGroup)) {
    return value;
  }
  for (const [destStart, srcStart, length] of layerGroup) {
    if (value >= srcStart && value < srcStart + length) {
      return mapLayers(layerGroups, destStart + (value - srcStart));
    }
  }
  return mapLayers(layerGroups, value);
}

const [[seeds], ...layers] = input.split(/\n\n/).map(p => p.split(/\n/));

const layerGroups = layers
  .map(([, ...group]) => group)
  .map(group => group.map(g => extractInts(g)));

const minConverted = Math.min(
  ...extractInts(seeds).map(seed => mapLayers(layerGroups, seed))
);

assert.strictEqual(minConverted, 323142486, 'Part 1 failed');
