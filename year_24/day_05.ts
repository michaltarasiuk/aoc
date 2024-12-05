import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const paragraphs = await getInputParagraphs({year: 2024, day: 5});

type Rules = typeof rules;

function isCorrectlyOrderedUpdate(rules: Rules, ...pageNumbers: number[]) {
  const seen = new Set<number>();
  for (const pageNumber of pageNumbers) {
    for (const [first] of rules[pageNumber] ?? []) {
      if (pageNumbers.includes(Number(first)) && !seen.has(Number(first))) {
        return false;
      }
    }
    seen.add(pageNumber);
  }
  return true;
}
function findRule(rules: Rules, first: number, second: number) {
  return rules[second]?.find(([a]) => Number(a) === first);
}

const rules = Object.groupBy(
  paragraphs[0].map(rule => rule.split('|')),
  ([, second]) => second
);

const [correctlyOrderedUpdates, incorrectlyOrderedUpdates] = paragraphs[1]
  .map(update => update.split(',').map(Number))
  .reduce<[number[][], number[][]]>(
    (acc, update) => {
      acc[isCorrectlyOrderedUpdate(rules, ...update) ? 0 : 1].push(update);
      return acc;
    },
    [[], []]
  );

const sumMiddleCorrect = correctlyOrderedUpdates.reduce(
  (acc, update) => acc + update[Math.floor(update.length / 2)],
  0
);
const sumMiddleIncorrect = incorrectlyOrderedUpdates
  .map(update => update.toSorted((a, b) => (findRule(rules, a, b) ? -1 : 1)))
  .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0);

assert.strictEqual(sumMiddleCorrect, 7365, 'Part 1 failed');
assert.strictEqual(sumMiddleIncorrect, 5770, 'Part 2 failed');
