import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2023, day: 1});

const digitRe = /\d/;
const lastdigitRe = new RegExp(`.*(${digitRe.source})`);

const calibrationValuesSum = sum(
  ...lines.map(l => {
    const first = l.match(digitRe)?.at(0) ?? raise('No digit');
    const last = l.match(lastdigitRe)?.at(1) ?? first;

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
    const first = l.match(digitOrSpelledRe)?.at(0) ?? raise('No digit');
    const last = l.match(lastDigitOrSpelledRe)?.at(1) ?? first;

    return Number(
      [first, last]
        .map(digit => spelledDigitMap.get(digit) ?? Number(digit))
        .join('')
    );
  })
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(calibrationValuesSum).toBe(55621);
  });

  test('part 2', () => {
    expect(calibrationValuesSum2).toBe(53592);
  });
}
