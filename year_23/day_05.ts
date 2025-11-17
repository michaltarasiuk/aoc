import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2023, day: 5});

function parseLine(l: string) {
  return l.split(/\s+/).map(Number);
}

function applyMaps(maps: number[][][], value: number) {
  const [map, ...rest] = maps;
  if (!isDefined(map)) {
    return value;
  }
  for (const [a, b, size] of map) {
    if (value >= b && value < b + size) {
      const next = a + (value - a);
      return applyMaps(rest, next);
    }
  }
  return applyMaps(rest, value);
}

const [seedLine, ...sections] = input.split(/\n\n/);

const seeds = parseLine(seedLine.replace(/^seeds: /, ''));

const maps = sections
  .map(s => s.split(/\n/).slice(1))
  .map(lns => lns.map(parseLine));

const minLocation = Math.min(...seeds.map(s => applyMaps(maps, s)));

assert.strictEqual(minLocation, 323142486, 'Part 1 failed');
