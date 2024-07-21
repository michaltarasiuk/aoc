import {getInputParagraphs} from 'lib/input';
import {sum} from 'lib/sum';
import {uniq} from 'lib/uniq';

const paragraphs = await getInputParagraphs({year: 2020, day: 6});

const questionRe = /[a-z]/g;

const questionsCount = sum(
  ...paragraphs.map((paragraph) => {
    const questions = paragraph.join().match(questionRe) ?? [];
    return uniq(questions).length;
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(questionsCount).toBe(6310);
  });
}
