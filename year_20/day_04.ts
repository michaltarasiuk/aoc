import {getInputParagraphs} from 'lib/input';

const paragraphs = await getInputParagraphs({year: 2020, day: 4});

const pairRe = /(\w+):([^\s]+)/g;

const passports = paragraphs.map((paragraph) =>
  Object.fromEntries(
    Array.from(
      paragraph.join(' ').matchAll(pairRe),
      ([, key, value]) => [key, value] as const,
    ),
  ),
);

const REQUIRED_FIELDS = {
  byr: /^(19[2-9]\d|200[0-2])$/,
  iyr: /^(201\d|2020)$/,
  eyr: /^(202\d|2030)$/,
  hgt: /^((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^\d{9}$/,
};

const validPassportsCount = passports.reduce((acc, passport) => {
  const hasRequiredFields = Object.keys(REQUIRED_FIELDS).every((key) =>
    Object.hasOwn(passport, key),
  );

  return acc + Number(hasRequiredFields);
}, 0);

const validPassportsCount2 = passports.reduce((acc, passport) => {
  const hasRequiredFields = Object.entries(REQUIRED_FIELDS).every(
    ([key, pattern]) => pattern.test(passport[key]),
  );

  return acc + Number(hasRequiredFields);
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPassportsCount).toBe(208);
  });

  test('part 2', () => {
    expect(validPassportsCount2).toBe(167);
  });
}
