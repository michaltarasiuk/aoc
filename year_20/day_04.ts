import {getInputParagraphs} from 'lib/input';
import {isKeyOf} from 'lib/is_key_of';
import {sum} from 'lib/math';

const paragraphs = await getInputParagraphs({year: 2020, day: 4});

function parsePassport(passport: string[]) {
  const pairRe = /(\w+):(\S+)/g;
  const passportEntries = Array.from(
    passport.join(' ').matchAll(pairRe),
    ([, key, value]) => [key, value] as const,
  );

  return Object.fromEntries(passportEntries);
}

function countValidPassports<Passport extends Record<string, string>>(
  passports: Passport[],
  predicate: (passport: Passport) => boolean,
) {
  return sum(...passports.map((passport) => Number(predicate(passport))));
}

const PASSPORT_KEYS = {
  byr: /^(19[2-9]\d|200[0-2])$/,
  iyr: /^(201\d|2020)$/,
  eyr: /^(202\d|2030)$/,
  hgt: /^((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^\d{9}$/,
};

const passports = paragraphs.map(parsePassport);

const validPassportsCount = countValidPassports(passports, (passport) =>
  Object.keys(PASSPORT_KEYS).every((key) => isKeyOf(passport, key)),
);

const validPassportsCount2 = countValidPassports(passports, (passport) =>
  Object.entries(PASSPORT_KEYS).every(([key, re]) => re.test(passport[key])),
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
