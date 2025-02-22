import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await readInput({year: 2023, day: 5});

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

const [seeds, ...layers] = input.split(/\n\n/);

const layerGroups = layers
  .map(l => l.split(/\n/).slice(1))
  .map(g => g.map(l => l.match(/\d+/g)!.map(Number)));

const minConverted = Math.min(
  ...(seeds.match(/\d+/g) ?? []).map(s => mapLayers(layerGroups, Number(s)))
);

assert.strictEqual(minConverted, 323142486, 'Part 1 failed');
