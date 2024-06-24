import {adjacentAt} from 'lib/adjacent_at';
import {getInputLns} from 'lib/input';
import {permute} from 'lib/permutate';

const lns = await getInputLns({year: 2015, day: 13});

function parseSeatingHappiness(seatingHappiness: string) {
	return [
		...seatingHappiness.match(/([A-Z])\w+/g)!,
		...seatingHappiness.match(/(gain|lose|\d+)/g)!,
	];
}

const guests = lns.reduce<Record<string, {[name: string]: number}>>(
	(acc, ln) => {
		const [a, b, type, val] = parseSeatingHappiness(ln);

		acc[a] ??= {};
		acc[a][b] = parseInt(val) * (type === 'gain' ? 1 : -1);
		return acc;
	},
	{},
);

function addGuest(name: string, score = 0) {
	guests[name] = {};
	for (const guest of Object.keys(guests)) {
		guests[guest][name] = score;
		guests[name][guest] = score;
	}
}

function permuteGuestsNames() {
	return permute(Object.keys(guests));
}

function calcTotalHappiness(names: string[]) {
	return names.reduce((acc, name, i) => {
		const [left, right] = adjacentAt(names, i);
		return acc + guests[name][left] + guests[name][right];
	}, 0);
}

const result = Math.max(...permuteGuestsNames().map(calcTotalHappiness));

addGuest('Me');
const result2 = Math.max(...permuteGuestsNames().map(calcTotalHappiness));

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(664);
	});

	test('part 2', () => {
		expect(result2).toBe(640);
	});
}
