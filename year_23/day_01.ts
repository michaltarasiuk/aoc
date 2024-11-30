import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2023, day: 1});

const digitRe = /\d/;
const lastdigitRe = new RegExp(`.*(${digitRe.source})`);

const calibrationValuesSum = sum(
  ...lines.map(l => {
    const [first = raise('No digit')] = l.match(digitRe) ?? [];
    const [, last = first] = l.match(lastdigitRe) ?? [];

    return Number(first + last);
  })
);

const spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
const spelledDigitMap = new Map(
  spelledDigitRe.source.split('|').map((spelled, i) => [spelled, i + 1])
);

const digitOrSpelledRe = new RegExp(
  `${digitRe.source}|${spelledDigitRe.source}`
);
const lastDigitOrSpelledRe = new RegExp(`.*(${digitOrSpelledRe.source})`);

const calibrationValuesSum2 = sum(
  ...lines.map(l => {
    const [first = raise('No digit')] = l.match(digitOrSpelledRe) ?? [];
    const [, last = first] = l.match(lastDigitOrSpelledRe) ?? [];

    return Number(
      [first, last]
        .map(digit => spelledDigitMap.get(digit) ?? Number(digit))
        .join('')
    );
  })
);

assert.strictEqual(calibrationValuesSum, 55621, 'Part 1 failed');
assert.strictEqual(calibrationValuesSum2, 53592, 'Part 2 failed');
