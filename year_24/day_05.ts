import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 5});

const [rules, updates] = input.split(/\n\n/).map(p => p.split(/\n/));

const rulesByPage = Object.groupBy(
  rules.map(r => r.split('|').map(Number)),
  ([, after]) => after
);

const {valid = [], invalid = []} = Object.groupBy(
  updates.map(u => u.split(',').map(Number)),
  update => {
    const visited = new Set<number>();
    for (const page of update) {
      visited.add(page);
      for (const [before] of rulesByPage[page] ?? []) {
        if (update.includes(before) && !visited.has(before)) {
          return 'invalid';
        }
      }
    }
    return 'valid';
  }
);

const validMiddleSum = valid.reduce(
  (sum, update) => sum + update[Math.floor(update.length / 2)],
  0
);

let invalidMiddleSum = 0;
for (const update of invalid) {
  const sorted = update.toSorted((a, b) =>
    rulesByPage[b]?.find(rule => rule[0] === a) ? -1 : 1
  );
  invalidMiddleSum += sorted[Math.floor(sorted.length / 2)];
}

assert.strictEqual(validMiddleSum, 7365, 'Part 1 failed');
assert.strictEqual(invalidMiddleSum, 5770, 'Part 2 failed');
