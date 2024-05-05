import {getInputLines} from '../lib/get_input';
import {permutations} from '../lib/permutations';
import {raise} from '../lib/raise';

const lns = await getInputLines({
	year: 2015,
	day: 9,
});

const parse = (ln: string) => {
	const [, a = raise(), b = raise(), cost = raise()] =
		ln.match(/^(\w+) to (\w+) = (\d+)$/) ?? [];
	return {a, b, cost: Number(cost)};
};

const m = lns.reduce(
	(acc, ln) => {
		const {a, b, cost} = parse(ln);

		(acc[a] ??= {}), (acc[a]![b] = cost);
		(acc[b] ??= {}), (acc[b]![a] = cost);

		return acc;
	},
	{} as {[k: string]: Record<string, number>},
);

let costs: number[] = [];

for (const cs of permutations(Object.keys(m))) {
	let cost = 0;
	for (const [idx, c] of cs.entries()) {
		cost += m[c]![cs[idx + 1]!] ?? 0;
	}
	costs.push(cost);
}

console.log({
	min: Math.min(...costs),
	max: Math.max(...costs),
});
