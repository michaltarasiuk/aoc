import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const paragraphs = await getInputParagraphs({year: 2024, day: 5});

type Rules = typeof rules;

function isUpdateInCorrectOrder(rules: Rules, update: number[]) {
  const seen = new Set<number>();
  for (const pageNumber of update) {
    for (const [preceding] of rules[pageNumber] ?? []) {
      if (update.includes(preceding) && !seen.has(preceding)) {
        return false;
      }
    }
    seen.add(pageNumber);
  }
  return true;
}
function findRule(rules: Rules, preceding: number, succeeding: number) {
  return rules[succeeding]?.find(rule => rule[0] === preceding);
}

const rules = Object.groupBy(
  paragraphs[0].map(rule => rule.split('|').map(Number)),
  ([, succeeding]) => succeeding
);
const updates = paragraphs[1].map(update => update.split(',').map(Number));

const {correctlyOrdered = [], incorrectlyOrdered = []} = Object.groupBy(
  updates,
  update =>
    isUpdateInCorrectOrder(rules, update)
      ? 'correctlyOrdered'
      : 'incorrectlyOrdered'
);

const sumMiddleCorrect = correctlyOrdered.reduce(
  (acc, update) => acc + update[Math.floor(update.length / 2)],
  0
);
const sumMiddleIncorrect = incorrectlyOrdered
  .map(update => update.toSorted((a, b) => (findRule(rules, a, b) ? -1 : 1)))
  .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);

assert.strictEqual(sumMiddleCorrect, 7365, 'Part 1 failed');
assert.strictEqual(sumMiddleIncorrect, 5770, 'Part 2 failed');
