import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2020, day: 6});

const questionRe = /[a-z]/g;
const questions = input
  .split(/\n\n/)
  .map(p => p.split(/\n/))
  .map(p => p.map((l): string[] => l.match(questionRe) ?? []));

const questionsCount = questions
  .map(group => new Set(group.flat()).size)
  .reduce((a, b) => a + b);

const questionsCount2 = questions
  .flatMap(group => {
    const intersection = group.reduce((acc, questions) => [
      ...new Set(questions).intersection(new Set(acc)),
    ]);
    return intersection.length;
  })
  .reduce((a, b) => a + b);

assert.strictEqual(questionsCount, 6310, 'Part 1 failed');
assert.strictEqual(questionsCount2, 3193, 'Part 2 failed');
