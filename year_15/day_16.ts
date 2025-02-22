import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2015, day: 16});

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

function findBestMatchSueId(
  sues: (readonly [number, string])[],
  fn = (k: keyof typeof TickerTape, v: number) => TickerTape[k] === v
) {
  let bestMatchSueId = -1;
  let bestMatchCount = -1;
  for (const [id, items] of sues) {
    const count = items
      .matchAll(/(\w+): (\d+)/g)
      .map(([, k, v]) => {
        assert(isKeyof(TickerTape, k));
        return fn(k, Number(v));
      })
      .map(Number)
      .reduce((a, b) => a + b);
    if (count > bestMatchCount) {
      bestMatchCount = count;
      bestMatchSueId = id;
    }
  }
  return bestMatchSueId;
}

const sueRe = /^Sue (\d+): (.*)/;
const sues = input.split(/\n/).map(l => {
  const [, id, items] = l.match(sueRe) ?? raise('No match');
  return [Number(id), items] as const;
});

const bestMatchSueId = findBestMatchSueId(sues);
const bestMatchSueId2 = findBestMatchSueId(sues, (k, v) => {
  switch (k) {
    case 'cats':
    case 'trees':
      return TickerTape[k] < v;
    case 'pomeranians':
    case 'goldfish':
      return TickerTape[k] > v;
    default:
      return TickerTape[k] === v;
  }
});

assert.strictEqual(bestMatchSueId, 373, 'Part 1 failed');
assert.strictEqual(bestMatchSueId2, 260, 'Part 2 failed');
