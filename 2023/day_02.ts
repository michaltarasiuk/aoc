import {assertKeyIn} from 'lib/assert_key_in';
import {getInputLns} from 'lib/input';
import {isDefined} from 'lib/is_defined';

const lns = await getInputLns({year: 2023, day: 2});

function parseLn(ln: string) {
	const gameRe = /(\d+)(?: (\w+))?/g;
	const gameMatch = ln.matchAll(gameRe) ?? [];

	return Array.from(
		gameMatch,
		([, num, cube]) =>
			[Number(num), ...(isDefined(cube) ? [cube] : [])] as const,
	);
}

function collectMaxCubeSizes(cubes: (readonly [number, ...string[]])[]) {
	return cubes.reduce(
		(acc, [count, cube]) => {
			assertKeyIn(acc, cube);
			acc[cube] = Math.max(acc[cube], count);
			return acc;
		},
		{red: 0, green: 0, blue: 0},
	);
}

const result = lns.reduce((acc, ln) => {
	const [[id], ...cubes] = parseLn(ln);
	const {red, green, blue} = collectMaxCubeSizes(cubes);

	if (red <= 12 && green <= 13 && blue <= 14) {
		acc += id;
	}
	return acc;
}, 0);

console.log(result);
