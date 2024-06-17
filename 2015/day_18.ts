import {getInputGrid} from 'lib/input';

const grid = await getInputGrid({year: 2015, day: 18});

const ENABLED_LIGHT = '#';
const DISABLED_LIGHT = '.';

const NEIGHBORS = [
	[-1, 0, 1],
	[-1, 1],
	[-1, 0, 1],
];

function getNeighbors(lights: string[][], {x, y}: {x: number; y: number}) {
	return NEIGHBORS.reduce<string[][]>((acc, offsets, i) => {
		acc.push(
			offsets.flatMap((offset) => lights[y + i - 1]?.[x + offset] ?? []),
		);
		return acc;
	}, []);
}

function countEnabledLights(lights: string[][]) {
	const enabledLightsRe = new RegExp(ENABLED_LIGHT, 'g');
	return Array.from(lights.join().matchAll(enabledLightsRe)).length;
}

function switchLight(light: string, enabledLightsCount: number) {
	if (light === ENABLED_LIGHT) {
		return enabledLightsCount === 2 || enabledLightsCount === 3
			? ENABLED_LIGHT
			: DISABLED_LIGHT;
	}
	return enabledLightsCount === 3 ? ENABLED_LIGHT : DISABLED_LIGHT;
}

function animate(lights: string[][]) {
	return lights.map((row, y) =>
		row.map((light, x) => {
			const neighbors = getNeighbors(lights, {x, y});
			const enabledLightsCount = countEnabledLights(neighbors);

			return switchLight(light, enabledLightsCount);
		}),
	);
}

let lights = grid;

for (let i = 0; i < 100; i++) {
	lights = animate(lights);
}

const result = countEnabledLights(lights);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(821);
	});
}
