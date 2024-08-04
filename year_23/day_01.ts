import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2023, day: 1});

const digitRe = /\d/;
const lastdigitRe = new RegExp(`.*(${digitRe.source})`);

const calibrationValuesSum = sum(
  lns.map((ln) => {
    const first = ln.match(digitRe)?.at(0) ?? raise('No digit');
    const last = ln.match(lastdigitRe)?.at(1) ?? first;

    return Number(first + last);
  }),
);

const spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
const spelledDigitMap = new Map(
  spelledDigitRe.source.split('|').map((spelled, i) => [spelled, i + 1]),
);

const digitOrSpelledRe = new RegExp(
  `${digitRe.source}|${spelledDigitRe.source}`,
);
const lastDigitOrSpelledRe = new RegExp(`.*(${digitOrSpelledRe.source})`);

const calibrationValuesSum2 = sum(
  ...lns.map((ln) => {
    const first = ln.match(digitOrSpelledRe)?.at(0) ?? raise('No digit');
    const last = ln.match(lastDigitOrSpelledRe)?.at(1) ?? first;

    return Number(
      [first, last]
        .map((digit) => spelledDigitMap.get(digit) ?? Number(digit))
        .join(''),
    );
  }),
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
