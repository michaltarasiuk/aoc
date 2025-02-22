import assert from 'node:assert';

import {frequencies} from 'lib/frequencies.js';
import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2024, day: 1});

const locations = input.split(/\n/).map(ln => {
  const locationPairRe = /^(\d+) {3}(\d+)$/;
  const [, l, r] = locationPairRe.exec(ln) ?? raise(`Invalid pair: ${ln}`);
  return [Number(l), Number(r)] as const;
});

const l = locations.map(([l]) => l).sort();
const r = locations.map(([, r]) => r).sort();

const totalDistance = l.reduce((acc, v, i) => acc + Math.abs(v - r[i]), 0);

const rFrequencies = frequencies(r);
const similarityScore = l.reduce(
  (acc, value) => acc + value * (rFrequencies.get(value) ?? 0),
  0
);

assert.strictEqual(totalDistance, 3508942, 'Part 1 failed');
assert.strictEqual(similarityScore, 26593248, 'Part 2 failed');
