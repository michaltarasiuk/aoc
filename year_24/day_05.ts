import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const [rawRules, rawUpdates] = await getInputParagraphs({year: 2024, day: 5});

type Rules = typeof rules;

function isUpdateInCorrectOrder(rules: Rules, update: number[]) {
  const seen = new Set<number>();
  return update.every(page => {
    seen.add(page);
    return (rules[page] ?? []).every(
      ([preceding]) => !update.includes(preceding) || seen.has(preceding)
    );
  });
}
function findRule(rules: Rules, preceding: number, succeeding: number) {
  return rules[succeeding]?.find(rule => rule[0] === preceding);
}

const rules = Object.groupBy(
  rawRules.map(rule => rule.split('|').map(Number)),
  ([, succeeding]) => succeeding
);
const updates = rawUpdates.map(update => update.split(',').map(Number));

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
