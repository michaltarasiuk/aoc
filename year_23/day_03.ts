import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await readInput({year: 2023, day: 3});

type Layer = string[][];

function range(n: number, x: number) {
  const Offset = 1;
  return [Math.max(x - Offset, 0), x + String(n).length + Offset] as const;
}

const Offsets = [-1, 0, 1];

const lines = input.split(/\n/);
const layers: Layer[] = [];
for (const [y, l] of lines.entries()) {
  const matches = l.matchAll(/\d+/g).map(m => [Number(m[0]), m.index] as const);
  const layer: Layer = [];
  for (const [n, x] of matches) {
    const segments = Offsets.map(j => lines[y + j]?.slice(...range(n, x)));
    layer.push(segments);
  }
  layers.push(layer);
}

const symbolRe = /[^\d.]/;
const sumOfPartNumbers = layers.flat().reduce((acc, segments) => {
  if (segments.filter(isDefined).some(s => symbolRe.test(s))) {
    acc += Number(segments[1].replace(/\D/g, ''));
  }
  return acc;
}, 0);

assert.strictEqual(sumOfPartNumbers, 531561, 'Part 1 failed');
