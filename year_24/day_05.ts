import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const paragraphs = await getInputParagraphs({year: 2024, day: 5});

function isCorrectlyOrderedUpdate(
  rules: Partial<Record<string, string[][]>>,
  ...pageNumbers: number[]
) {
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

const rules = Object.groupBy(
  paragraphs[0].map(rule => rule.split('|')),
  ([, second]) => second
);

const totalOfMiddlePageNumbers = paragraphs[1].reduce((acc, update) => {
  const pageNumbers = update.split(',').map(Number);
  if (isCorrectlyOrderedUpdate(rules, ...pageNumbers)) {
    acc += pageNumbers[Math.floor(pageNumbers.length / 2)];
  }
  return acc;
}, 0);

assert.strictEqual(totalOfMiddlePageNumbers, 7365, 'Part 1 failed');
