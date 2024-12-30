import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {extractIntegers} from 'lib/parse.js';

const [rules, updates] = await getInputParagraphs({year: 2024, day: 5});

const groupedRules = Object.groupBy(
  rules.map(rule => extractIntegers(rule)),
  ([, succeeding]) => succeeding
);

const {correctlyOrdered = [], incorrectlyOrdered = []} = Object.groupBy(
  updates.map(update => extractIntegers(update)),
  update => {
    const seen = new Set<number>();
    for (const page of update) {
      seen.add(page);
      for (const [preceding] of groupedRules[page] ?? []) {
        if (update.includes(preceding) && !seen.has(preceding)) {
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
  const update = incorrectUpdate.toSorted((a, b) => {
    const rule = groupedRules[b]?.find(rule => rule[0] === a);
    return rule ? -1 : 1;
  });
  sumMiddleIncorrect += update[Math.floor(update.length / 2)];
}

assert.strictEqual(sumMiddleCorrect, 7365, 'Part 1 failed');
assert.strictEqual(sumMiddleIncorrect, 5770, 'Part 2 failed');
