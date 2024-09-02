import {getInputParagraphs} from 'lib/input';
import {sum} from 'lib/math';
import {uniq} from 'lib/uniq';

const paragraphs = await getInputParagraphs({year: 2020, day: 6});

const questionRe = /[a-z]/g;

const questions = paragraphs.map(paragraph =>
  paragraph.map((line): string[] => line.match(questionRe) ?? [])
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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(questionsCount).toBe(6310);
  });

  test('part 2', () => {
    expect(questionsCount2).toBe(3193);
  });
}
