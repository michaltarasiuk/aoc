import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 18});

const LIGHT_ON = '#';
const LIGHT_OFF = '.';

function getNeighbors(state: string[][], {x, y}: {x: number; y: number}) {
	const start = Math.max(0, x - 1);
	const end = x + 2;

	return [
		state[y][x - 1],
		state[y][x + 1],
		...[-1, 1].flatMap((idx) => state[y + idx]?.slice(start, end) ?? []),
	];
}

function getLightsOn(lights: string[]) {
	return lights.filter((light) => light === LIGHT_ON);
}

function getNewLight(light: string, {x, y}: {x: number; y: number}) {
	const neighbors = getNeighbors(state, {x, y});
	const neighborsOn = getLightsOn(neighbors).length;

	if (light === LIGHT_ON) {
		return neighborsOn === 2 || neighborsOn === 3 ? LIGHT_ON : LIGHT_OFF;
	}
	return neighborsOn === 3 ? LIGHT_ON : LIGHT_OFF;
}

let state = lns.map((ln) => ln.split(''));

for (let i = 0; i < 100; i++) {
	state = state.map((lights, y) =>
		lights.map((light, x) => getNewLight(light, {x, y})),
	);
}

const result = getLightsOn(state.flat()).length;

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(821);
	});
}
