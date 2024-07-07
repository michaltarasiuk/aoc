import {assertKeyIn} from 'lib/assert_key_in';
import {create2dArr} from 'lib/create_2d_arr';
import {getInputLns} from 'lib/input';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2015, day: 6});

function parseInstruction(instruction: string) {
	const instructionRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
	const [, action, ...dimensions] = instruction.match(instructionRe)!;

	return [action, ...dimensions.map(Number)] as const;
}

function countLights(
	actions: Record<'turn on' | 'turn off' | 'toggle', (val: number) => number>,
) {
	const lights = create2dArr(1_000, 0);

	for (const ln of lns) {
		const [action, x1, y1, x2, y2] = parseInstruction(ln);

		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				assertKeyIn(actions, action);
				lights[y][x] = actions[action](lights[y][x]);
			}
		}
	}
	return sum(lights.flat());
}

const result = countLights({
	'turn on': () => 1,
	'turn off': () => 0,
	toggle: (val) => +!val,
});

const result2 = countLights({
	'turn on': (val) => val + 1,
	'turn off': (val) => Math.max(val - 1, 0),
	toggle: (val) => val + 2,
});

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(400410);
	});

	test('part 2', () => {
		expect(result2).toBe(15343601);
	});
}
