import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await readInput({year: 2023, day: 3});

type Layer = string[][];

const Offsets = [-1, 0, 1];
const symbolRe = /[^\d.]/;

function getRange(n: number, x: number) {
  const offset = 1;
  return [Math.max(x - offset, 0), x + String(n).length + offset];
}

function extractSegments(
  lines: string[],
  y: number,
  x: number,
  n: number
): string[] {
  return Offsets.map(j => lines[y + j]?.slice(...getRange(n, x)));
}

function parseLayers(lines: string[]) {
  return lines.map((l, y) => {
    const matches = Array.from(
      l.matchAll(/\d+/g),
      m => [Number(m[0]), m.index] as const
    );
    return matches.map(([n, x]) => extractSegments(lines, y, x, n));
  });
}

function sumPartNumbers(layers: Layer[]) {
  return layers.flat().reduce((acc, segments) => {
    if (segments.filter(isDefined).some(s => symbolRe.test(s))) {
      acc += Number(segments[1].replace(/\D/g, ''));
    }
    return acc;
  }, 0);
}

const lines = input.split(/\n/);
const layers = parseLayers(lines);

const part1Result = sumPartNumbers(layers);

assert.strictEqual(part1Result, 531561, 'Part 1 failed');
