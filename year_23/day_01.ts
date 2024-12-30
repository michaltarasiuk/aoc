import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2023, day: 1});

const digitRe = /\d/;
const lastdigitRe = new RegExp(`.*(${digitRe.source})`);

const calibrationValuesSum = lines
  .map(l => {
    const [first = raise('No digit')] = l.match(digitRe) ?? [];
    const [, last = first] = l.match(lastdigitRe) ?? [];

    return Number(first + last);
  })
  .reduce((a, b) => a + b);

const spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
const spelledDigitMap = new Map(
  spelledDigitRe.source.split('|').map((spelled, i) => [spelled, i + 1])
);

const digitOrSpelledRe = new RegExp(
  `${digitRe.source}|${spelledDigitRe.source}`
);
const lastDigitOrSpelledRe = new RegExp(`.*(${digitOrSpelledRe.source})`);

const calibrationValuesSum2 = lines
  .map(l => {
    const [first = raise('No digit')] = l.match(digitOrSpelledRe) ?? [];
    const [, last = first] = l.match(lastDigitOrSpelledRe) ?? [];

    return Number(
      [first, last]
        .map(digit => spelledDigitMap.get(digit) ?? Number(digit))
        .join('')
    );
  })
  .reduce((a, b) => a + b);

assert.strictEqual(calibrationValuesSum, 55621, 'Part 1 failed');
assert.strictEqual(calibrationValuesSum2, 53592, 'Part 2 failed');
