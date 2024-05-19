import { add } from "lib/add";
import { create2dArr } from "lib/create_2d_arr";
import { getInputLines } from "lib/input";
import { raise } from "lib/raise";

const lns = await getInputLines({ year: 2015, day: 6 });

type Light = {
	action: string;
	x1: string;
	y1: string;
	x2: string;
	y2: string;
};

const parse = (ln: string) => {
	const lineRe =
		/^(?<action>.*) (?<x1>\d+),(?<y1>\d+) through (?<x2>\d+),(?<y2>\d+)$/;
	const match = ln.match(lineRe);

	return match ? (match.groups as Light) : raise(`No match for "${ln}"`);
};

type Action = (val: number) => number;

const count = (actions: Record<string, Action>) => {
	const acc = create2dArr(1_000, 0);

	for (const ln of lns) {
		const { action, x1, y1, x2, y2 } = parse(ln);

		for (let x = Number(x1); x <= Number(x2); x++) {
			for (let y = Number(y1); y <= Number(y2); y++) {
				acc[y][x] = actions[action](acc[y][x]);
			}
		}
	}

	return add(acc.flat());
};

const litLightsCounter = count({
	"turn on": () => 1,
	"turn off": () => 0,
	toggle: (val) => (val === 0 ? 1 : 0),
});

const brightnessCounter = count({
	"turn on": (val) => val + 1,
	"turn off": (val) => Math.max(val - 1, 0),
	toggle: (val) => val + 2,
});

console.log({ litLightsCounter, brightnessCounter });
