import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2024, day: 1});

let {l = [], r = []} = Object.groupBy(
  lines.flatMap(ln => {
    const locationPairRe = /^(\d+) {3}(\d+)$/;
    const [, l, r] = locationPairRe.exec(ln) ?? raise(`Invalid pair: ${ln}`);
    return [Number(l), Number(r)];
  }),
  (_, i) => (i % 2 === 0 ? 'l' : 'r')
);
(l = l.toSorted()), (r = r.toSorted());

const totalDistance = sum(...l.map((n, i) => Math.abs(n - r[i])));
const similarityScore = sum(...l.map(n => n * (frequencies(r).get(n) ?? 0)));

assert.strictEqual(totalDistance, 3508942, 'Part 1 failed');
assert.strictEqual(similarityScore, 26593248, 'Part 2 failed');
