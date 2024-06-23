import {getInputLns} from 'lib/input';
import {permute} from 'lib/permutate';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2015, day: 9});

function parseLn(ln: string) {
	const lineRe = /^(\w+) to (\w+) = (\d+)$/;
	const [, a, b, cost] = ln.match(lineRe) ?? [];

	return {a, b, cost: Number(cost)};
}

const costMap = lns.reduce<{[k: string]: Record<string, number>}>((acc, ln) => {
	const {a, b, cost} = parseLn(ln);

	(acc[a] ??= {}), (acc[a][b] = cost);
	(acc[b] ??= {}), (acc[b][a] = cost);
	return acc;
}, {});
const costMapKeys = Object.keys(costMap);

const costs = permute(costMapKeys).reduce<number[]>((acc, cities) => {
	const cost = sum(
		cities.map((city, i) => {
			const dest = cities[i + 1];
			return costMap[city][dest] ?? 0;
		}),
	);
	return acc.concat(cost);
}, []);

const result = Math.min(...costs);
const result2 = Math.max(...costs);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(251);
	});

	test('part 2', () => {
		expect(result2).toBe(898);
	});
}
