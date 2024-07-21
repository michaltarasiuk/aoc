import {getInputParagraphs} from 'lib/input';

const paragraphs = await getInputParagraphs({year: 2020, day: 4});

const pairRe = /(\w+):([^\s]+)/g;

const passports = paragraphs.map((paragraph) =>
  Array.from(
    paragraph.join(' ').matchAll(pairRe),
    ([, key, value]) => [key, value] as const,
  ),
);

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validPassportsCount = passports.reduce((acc, passport) => {
  const fields = passport.map(([key]) => key);
  return acc + +REQUIRED_FIELDS.every((field) => fields.includes(field));
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPassportsCount).toBe(208);
  });
}
