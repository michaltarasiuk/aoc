import { divideWithRemainder } from "lib/divide_and_remainder";
import { getInputLines } from "lib/get_input";

const lns = await getInputLines({
	year: 2015,
	day: 14,
});

const parse = (ln: string) => {
	const [speed = 0, speedTime = 0, rest = 0] = Array.from(
		ln.matchAll(/\d+/g),
		Number,
	);
	return { speed, speedTime, rest };
};

const fullTime = 2_503;

const calcDistance = ({ speed, speedTime, rest }: ReturnType<typeof parse>) => {
	const timeChunk = speedTime + rest;
	const [fullTimeChunks, remainTime] = divideWithRemainder(
		fullTime,
		timeChunk,
	);

	return (
		speed * (fullTimeChunks * speedTime + Math.min(speedTime, remainTime))
	);
};

let maxDistance = 0;

for (const ln of lns) {
	const parsed = parse(ln);
	maxDistance = Math.max(maxDistance, calcDistance(parsed));
}

console.log(maxDistance);
