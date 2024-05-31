import {add} from 'lib/add';
import {create2dArr} from 'lib/create_2d_arr';
import {getInputLns} from 'lib/input';
import {raise} from 'lib/raise';

const lns = await getInputLns({year: 2015, day: 6});

type Light = Record<`${'x' | 'y'}${1 | 2}`, string> & {
	action: string;
};

const parseLn = (ln: string) => {
	const lineRe =
		/^(?<action>.*) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)$/;
	const match = ln.match(lineRe);

	return match ? (match.groups as Light) : raise(`No match for "${ln}"`);
};

type Action = (val: number) => number;

const countLights = (actions: Record<string, Action>) => {
	const acc = create2dArr(1_000, 0);

	for (const ln of lns) {
		const {action, x1, y1, x2, y2} = parseLn(ln);

		for (let x = Number(x1); x <= Number(x2); x++) {
			for (let y = Number(y1); y <= Number(y2); y++) {
				acc[y][x] = actions[action](acc[y][x]);
			}
		}
	}
	return add(acc.flat());
};

const TURN_ON_KEY = 'turn on';
const TURN_OFF_KEY = 'turn off';

const litLightsCounter = countLights({
	[TURN_ON_KEY]: () => 1,
	[TURN_OFF_KEY]: () => 0,
	toggle: (val) => (val === 0 ? 1 : 0),
});

const brightnessCounter = countLights({
	[TURN_ON_KEY]: (val) => val + 1,
	[TURN_OFF_KEY]: (val) => Math.max(val - 1, 0),
	toggle: (val) => val + 2,
});

console.log({litLightsCounter, brightnessCounter});
