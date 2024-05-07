import {getInputLines} from 'lib/get_input';
import {permute} from 'lib/permutate';
import {raise} from 'lib/raise';

const lns = await getInputLines({
	year: 2015,
	day: 9,
});

const parseLine = (ln: string) => {
	const lineRe = /^(\w+) to (\w+) = (\d+)$/;
	const [, a = raise(), b = raise(), cost = raise()] = ln.match(lineRe) ?? [];

	return {a, b, cost: Number(cost)};
};

// Like {[city]: {[dest]: cost}}
const flightCostMap = lns.reduce<{[k: string]: Record<string, number>}>(
	(acc, ln) => {
		const {a, b, cost} = parseLine(ln);

		(acc[a] ??= {}), (acc[a]![b] = cost);
		(acc[b] ??= {}), (acc[b]![a] = cost);
		return acc;
	},
	{},
);

let costs: number[] = [];

for (const cities of permute(Object.keys(flightCostMap))) {
	let cost = 0;
	for (const [idx, city] of cities.entries()) {
		const dest = cities[idx + 1]!;
		cost += flightCostMap[city]?.[dest] ?? 0;
	}
	costs.push(cost);
}

console.log({
	min: Math.min(...costs),
	max: Math.max(...costs),
});
