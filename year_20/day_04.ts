import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const paragraphs = await getInputParagraphs({year: 2020, day: 4});

const PassportKeys = {
  byr: /^(19[2-9]\d|200[0-2])$/,
  iyr: /^(201\d|2020)$/,
  eyr: /^(202\d|2030)$/,
  hgt: /^((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)$/,
  pid: /^\d{9}$/,
};

const passports = paragraphs.map(passport => {
  const pairRe = /(\w+):(\S+)/g;

  return Object.fromEntries(
    passport
      .join(' ')
      .matchAll(pairRe)
      .map(([, k, v]) => [k, v])
  );
});

const validPassportsCount = passports
  .map(passport => Object.keys(PassportKeys).every(k => isKeyOf(passport, k)))
  .map(Number)
  .reduce((a, b) => a + b);

const validPassportsCount2 = passports
  .map(passport =>
    Object.entries(PassportKeys).every(
      ([k, re]) => isKeyOf(passport, k) && re.test(passport[k])
    )
  )
  .map(Number)
  .reduce((a, b) => a + b);

assert.strictEqual(validPassportsCount, 208, 'Part 1 failed');
assert.strictEqual(validPassportsCount2, 167, 'Part 2 failed');
