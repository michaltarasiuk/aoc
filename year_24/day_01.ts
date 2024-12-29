import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';

const lines = await getInputLines({year: 2024, day: 1});

const locations = lines.map(ln => {
  const locationPairRe = /^(\d+) {3}(\d+)$/;
  const [, l, r] = locationPairRe.exec(ln) ?? raise(`Invalid pair: ${ln}`);
  return [Number(l), Number(r)] as const;
});

const l = locations.map(([l]) => l).sort();
const r = locations.map(([, r]) => r).sort();

const totalDistance = l.reduce((acc, v, i) => acc + Math.abs(v - r[i]), 0);

const rFrequencies = frequencies(r);
const similarityScore = l.reduce(
  (acc, v) => acc + v * (rFrequencies.get(v) ?? 0),
  0
);

assert.strictEqual(totalDistance, 3508942, 'Part 1 failed');
assert.strictEqual(similarityScore, 26593248, 'Part 2 failed');
