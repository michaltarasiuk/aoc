import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const paragraphs = await getInputParagraphs({year: 2020, day: 6});

const questionRe = /[a-z]/g;
const questions = paragraphs.map(paragraph =>
  paragraph.map((l): string[] => l.match(questionRe) ?? [])
);

const questionsCount = questions
  .map(group => new Set(group.flat()).size)
  .reduce((a, b) => a + b);

const questionsCount2 = questions
  .flatMap(group => {
    const common = group.reduce((acc, questions) =>
      Array.from(new Set(questions).intersection(new Set(acc)))
    );
    return common.length;
  })
  .reduce((a, b) => a + b);

assert.strictEqual(questionsCount, 6310, 'Part 1 failed');
assert.strictEqual(questionsCount2, 3193, 'Part 2 failed');
