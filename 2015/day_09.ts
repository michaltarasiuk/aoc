import { getInputLines } from "lib/input";
import { permute } from "lib/permutate";

const lns = await getInputLines({
	year: 2015,
	day: 9,
});

const parseLine = (ln: string) => {
	const lineRe = /^(\w+) to (\w+) = (\d+)$/;
	const [, a, b, cost] = ln.match(lineRe) ?? [];

	if (!a || !b || !cost) throw new Error("Invalid line");
	return { a, b, cost: Number(cost) };
};

// Like {[city]: {[dest]: cost}}
type FlightCostMap = { [k: string]: Record<string, number> };

const flightCostMap = lns.reduce<FlightCostMap>((acc, ln) => {
	const { a, b, cost } = parseLine(ln);

	(acc[a] ??= {}), (acc[a]![b] = cost);
	(acc[b] ??= {}), (acc[b]![a] = cost);
	return acc;
}, {});

const costs: number[] = [];

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
