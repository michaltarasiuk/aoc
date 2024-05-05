import {getInputLines} from '../lib/get_input';

const lns = await getInputLines({
	year: 2015,
	day: 6,
});

const m: Record<string, boolean> = {};
const m2: Record<string, number> = {};

for (const ln of lns) {
	const match = ln.match(
		/^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/,
	);
	if (!match) continue;

	const [, cmd, ...digits] = match;

	let [x1 = 0, y1 = 0, x2 = 0, y2 = 0] = digits.map(Number);
	[x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
	[y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

	for (let x = x1; x <= x2; x++) {
		for (let y = y1; y <= y2; y++) {
			const k = `${x},${y}`;
			m2[k] ??= 0;
			switch (cmd) {
				case 'turn on':
					m[k] = true;
					m2[k]++;
					break;
				case 'turn off':
					m[k] = false;
					m2[k] = Math.max(0, m2[k]! - 1);
					break;
				case 'toggle':
					m[k] = !m[k];
					m2[k] += 2;
					break;
				default:
					throw new Error('unhandled cmd');
			}
		}
	}
}

let n = 0;
for (const k in m) {
	if (m[k]) n++;
}
console.log(n);

let n2 = 0;
for (const k in m2) {
	n2 += m2[k]!;
}
console.log(n2);
