import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {z} from 'zod';

const input = await getInput({year: 2021, day: 5});

const Coordinate = z.string().transform(Number);
const VentSchema = z
  .object({x1: Coordinate, y1: Coordinate, x2: Coordinate, y2: Coordinate})
  .transform(({x1, y1, x2, y2}) => {
    if (x1 > x2) [x1, x2] = [x2, x1];
    if (y1 > y2) [y1, y2] = [y2, y1];
    return {x1, y1, x2, y2};
  });

function parseVent(l: string) {
  const ventRe = /^(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)$/;
  return VentSchema.parse(ventRe.exec(l)?.groups);
}

const diagram: Record<string, number> = {};
for (const l of input.split(/\n/)) {
  const {x1, x2, y1, y2} = parseVent(l);
  if (x1 !== x2 && y1 !== y2) {
    continue;
  }
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      diagram[`${x},${y}`] = (diagram[`${x},${y}`] ?? 0) + 1;
    }
  }
}

const overlapCount = Object.values(diagram).filter(count => count >= 2).length;

assert.strictEqual(overlapCount, 5294, 'Part 1 failed');
