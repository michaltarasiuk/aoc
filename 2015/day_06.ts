import {getInputLines} from '../lib/get_input';
import {decrementClampedToZero} from '../lib/decrement_clamped_to_zero';
import {raise} from '../lib/raise';

const lns = await getInputLines({
	year: 2015,
	day: 6,
});

const match = (ln: string) => {
	const regex = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/;
	return ln.match(regex) ?? raise('no match');
};

const parse = (ln: string) => {
	const [, c = raise(), ...ds] = match(ln);

	let [x1 = 0, y1 = 0, x2 = 0, y2 = 0] = ds.map(Number);
	[x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
	[y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

	return {c, x1, y1, x2, y2};
};

const update = (c: string, ...xy: [number, number]) => {
	const k = xy.join();
	m2[k] ??= 0;

	switch (c) {
		case 'turn on':
			m[k] = true;
			m2[k]++;
			break;
		case 'turn off':
			m[k] = false;
			m2[k] = decrementClampedToZero(m2[k]!);
			break;
		case 'toggle':
			m[k] = !m[k];
			m2[k] += 2;
			break;
		default:
			throw new Error('unknown cmd');
	}
};

const m: Record<string, boolean> = {};
const m2: Record<string, number> = {};

for (const ln of lns) {
	const {c, x1, y1, x2, y2} = parse(ln);

	for (let x = x1; x <= x2; x++) {
		for (let y = y1; y <= y2; y++) {
			update(c, x, y);
		}
	}
}

let r = 0;
for (const k in m) if (m[k]) r++;

let r2 = 0;
for (const k in m2) r2 += m2[k]!;

console.log({r, r2});
