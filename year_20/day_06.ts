import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {uniq} from 'lib/iterable.js';
import {sum} from 'lib/math.js';

const paragraphs = await getInputParagraphs({year: 2020, day: 6});

const questionRe = /[a-z]/g;
const questions = paragraphs.map(paragraph =>
  paragraph.map((l): string[] => l.match(questionRe) ?? [])
);

const questionsCount = sum(
  ...questions.map(group => uniq(group.flat()).length)
);
const questionsCount2 = sum(
  ...questions.flatMap(group => {
    const common = group.reduce((acc, questions) =>
      Array.from(new Set(questions).intersection(new Set(acc)))
    );
    return common.length;
  })
);

assert.strictEqual(questionsCount, 6310, 'Part 1 failed');
assert.strictEqual(questionsCount2, 3193, 'Part 2 failed');
