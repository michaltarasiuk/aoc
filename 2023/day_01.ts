import {composeRegexes} from 'lib/compose_regexes';
import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2023, day: 1});

const digitRe = /\d/;
const digitRe2 = new RegExp(`.*(${digitRe.source})`);

const result = sum(
	lns.map((ln) => {
		const first = ln.match(digitRe)?.at(0) ?? raise('No digit.');
		const last = ln.match(digitRe2)?.at(1) ?? first;

		return Number(first + last);
	}),
);

const spelledDigitRe = /one|two|three|four|five|six|seven|eight|nine/;
const spelledDigitMap = Object.fromEntries(
	spelledDigitRe.source.split('|').map((spelled, i) => [spelled, i + 1]),
);

const digitOrSpelledRe = composeRegexes('', digitRe, spelledDigitRe);
const digitOrSpelledRe2 = new RegExp(`.*(${digitOrSpelledRe.source})`);

const result2 = sum(
	...lns.map((ln) => {
		const first = ln.match(digitOrSpelledRe)?.at(0) ?? raise('No digit.');
		const last = ln.match(digitOrSpelledRe2)?.at(1) ?? first;

		return Number(
			[first, last]
				.map((digit) => spelledDigitMap[digit] ?? Number(digit))
				.join(''),
		);
	}),
);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(55621);
	});

	test('part 2', () => {
		expect(result2).toBe(53592);
	});
}
