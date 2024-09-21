import {getInputParagraphs} from 'lib/input.js';
import {sum} from 'lib/math.js';
import {isKeyOf} from 'lib/predicate.js';

const paragraphs = await getInputParagraphs({year: 2020, day: 4});

const PASSPORT_KEYS = {
  byr: /^(19[2-9]\d|200[0-2])$/,
  iyr: /^(201\d|2020)$/,
  eyr: /^(202\d|2030)$/,
  hgt: /^((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^\d{9}$/,
};

function parsePassport(passport: string[]) {
  const pairRe = /(\w+):(\S+)/g;
  const entries = Array.from(
    passport.join(' ').matchAll(pairRe),
    ([, key, value]) => [key, value] as const
  );

  return Object.fromEntries(entries);
}

const passports = paragraphs.map(parsePassport);

const validPassportsCount = sum(
  ...passports.map(passport => {
    const isValid = Object.keys(PASSPORT_KEYS).every(key =>
      isKeyOf(passport, key)
    );
    return Number(isValid);
  })
);

const validPassportsCount2 = sum(
  ...passports.map(passport => {
    const isValid = Object.entries(PASSPORT_KEYS).every(
      ([key, re]) => isKeyOf(passport, key) && re.test(passport[key])
    );
    return Number(isValid);
  })
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(validPassportsCount).toBe(208);
  });

  test('part 2', () => {
    expect(validPassportsCount2).toBe(167);
  });
}
