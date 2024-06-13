import {divideWithRemainder} from 'lib/divide_with_remainder';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 14});

function parseLn(ln: string) {
	const [speed = 0, speedTime = 0, rest = 0] = Array.from(
		ln.matchAll(/\d+/g),
		Number,
	);
	return {speed, speedTime, rest};
}

const FULL_TIME = 2_503;

function calcDistance({speed, speedTime, rest}: ReturnType<typeof parseLn>) {
	const timeChunk = speedTime + rest;
	const [fullTimeChunks, remainTime] = divideWithRemainder(
		FULL_TIME,
		timeChunk,
	);

	return (
		speed * (fullTimeChunks * speedTime + Math.min(speedTime, remainTime))
	);
}

const maxDistance = lns.reduce((acc, ln) => {
	const parsed = parseLn(ln);
	return Math.max(acc, calcDistance(parsed));
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(maxDistance).toBe(2640);
	});
}
