import {getInput} from '../lib/get_input';

const input = await getInput({
	year: 2015,
	day: 2,
});

function calcPaper({l, w, h}: {l: number; w: number; h: number}) {
	const [lw, wh, hl] = [l * w, w * h, h * l];

	return 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
}

function calcRibbon({l, w, h}: {l: number; w: number; h: number}) {
	const distance = Math.min(2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l);
	const volume = l * w * h;

	return distance + volume;
}

let paper = 0,
	ribbon = 0;

for (const ln of input.split('\n')) {
	const m = ln.match(/^(\d+)x(\d+)x(\d+)$/);
	if (!m) continue;

	const [l = 0, w = 0, h = 0] = m.slice(1).map(Number);

	paper += calcPaper({l, w, h});
	ribbon += calcRibbon({l, w, h});
}

console.log({
	paper,
	ribbon,
});
