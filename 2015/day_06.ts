import {add} from 'lib/add';
import {assertKeyIn} from 'lib/assert_key_in';
import {create2dArr} from 'lib/create_2d_arr';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 6});

function parseLn(ln: string) {
	const lineRe = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/;
	const [, action, ...rest] = ln.match(lineRe) ?? [];
	const [x1, y1, x2, y2] = rest.map(Number);

	return {action, x1, y1, x2, y2};
}

type Actions = Record<
	'turn on' | 'turn off' | 'toggle',
	(val: number) => number
>;

function countLights(actions: Actions) {
	const acc = create2dArr(1_000, 0);

	for (const ln of lns) {
		const {action, x1, y1, x2, y2} = parseLn(ln);

		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				assertKeyIn(actions, action);
				acc[y][x] = actions[action](acc[y][x]);
			}
		}
	}
	return add(acc.flat());
}

const litLightsCounter = countLights({
	'turn on': () => 1,
	'turn off': () => 0,
	toggle: (val) => (val === 0 ? 1 : 0),
});

const brightnessCounter = countLights({
	'turn on': (val) => val + 1,
	'turn off': (val) => Math.max(val - 1, 0),
	toggle: (val) => val + 2,
});

console.log({litLightsCounter, brightnessCounter});
