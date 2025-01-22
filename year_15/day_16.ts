import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2015, day: 16});

const TickerTape = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const sueRe = /^Sue (\d+): (.*)/;
let bestMatchSueId = -1;
let bestMatchCount = -1;
for (const l of lines) {
  const [, id, items] = sueRe.exec(l) ?? raise(`Invalid sue: ${l}`);
  const count = items
    .matchAll(/(\w+): (\d+)/g)
    .map(([, k, v]) => {
      assert(isKeyOf(TickerTape, k));
      return TickerTape[k] === Number(v);
    })
    .map(Number)
    .reduce((a, b) => a + b, 0);
  if (count > bestMatchCount) {
    bestMatchCount = count;
    bestMatchSueId = Number(id);
  }
}

assert.strictEqual(bestMatchSueId, 373, 'Part 1 failed');
