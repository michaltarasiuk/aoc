import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2024, day: 19});

function countWays(
  design: string,
  patterns: RegExp[],
  cache: Record<typeof design, number> = {}
) {
  if (!design) return 1;
  if (Object.hasOwn(cache, design)) return cache[design];
  let ways = 0;
  for (const p of patterns.filter(p => p.test(design))) {
    ways += countWays(design.replace(p, ''), patterns, cache);
  }
  return (cache[design] = ways);
}

const [patterns, designs] = input.split(/\n\n/);

const compiledPatterns = patterns.split(', ').map(p => new RegExp('^' + p));
const waysCount = designs.split(/\n/).map(d => countWays(d, compiledPatterns));

const possibleDesignsCount = waysCount.filter(c => c > 0).length;
const totalWaysCount = waysCount.reduce((acc, c) => acc + c);

assert.strictEqual(possibleDesignsCount, 338, 'Part 1 failed');
assert.strictEqual(totalWaysCount, 841533074412361, 'Part 2 failed');
