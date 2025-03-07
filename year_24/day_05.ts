import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2024, day: 5});

const [rules, updates] = input.split(/\n\n/).map(p => p.split(/\n/));

const groupedRules = Object.groupBy(
  rules.map(r => r.split('|').map(Number)),
  ([, succeeding]) => succeeding
);

const {correctlyOrdered = [], incorrectlyOrdered = []} = Object.groupBy(
  updates.map(u => u.split(',').map(Number)),
  update => {
    const visted = new Set<number>();
    for (const page of update) {
      visted.add(page);
      for (const [preceding] of groupedRules[page] ?? []) {
        if (update.includes(preceding) && !visted.has(preceding)) {
          return 'incorrectlyOrdered';
        }
      }
    }
    return 'correctlyOrdered';
  }
);

const sumMiddleCorrect = correctlyOrdered.reduce(
  (acc, update) => acc + update[Math.floor(update.length / 2)],
  0
);

let sumMiddleIncorrect = 0;
for (const incorrectUpdate of incorrectlyOrdered) {
  const sortedUpdate = incorrectUpdate.toSorted((a, b) =>
    groupedRules[b]?.find(rule => rule[0] === a) ? -1 : 1
  );
  sumMiddleIncorrect += sortedUpdate[Math.floor(sortedUpdate.length / 2)];
}

assert.strictEqual(sumMiddleCorrect, 7365, 'Part 1 failed');
assert.strictEqual(sumMiddleIncorrect, 5770, 'Part 2 failed');
