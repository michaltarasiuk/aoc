import {getInputLns} from 'lib/input';
import {permute} from 'lib/permutate';

const lns = await getInputLns({year: 2015, day: 13});

const parseLn = (ln: string) => [
	...(ln.match(/([A-Z])\w+/g) ?? []),
	...(ln.match(/(gain|lose|\d+)/g) ?? []),
];

const guests = lns.reduce<Record<string, {[name: string]: number}>>(
	(acc, ln) => {
		const [a, b, type, val] = parseLn(ln);

		acc[a] ??= {};
		acc[a][b] = type === 'lose' ? -parseInt(val) : parseInt(val);
		return acc;
	},
	{},
);

const getGuestNames = () => Object.keys(guests);

function calcTotalHappiness(seats: string[]) {
	return seats.reduce((acc, name, idx) => {
		const left = seats.at(idx - 1)!;
		const right = seats.at((idx + 1) % seats.length)!;

		return acc + guests[name][left] + guests[name][right];
	}, 0);
}

const guestNames = getGuestNames();
const result = Math.max(...permute(guestNames).map(calcTotalHappiness));

for (const name of guestNames) {
	guests.Me ??= {};
	guests.Me[name] = 0;
	guests[name].Me = 0;
}

const result2 = permute(getGuestNames()).reduce(
	(acc, names) => Math.max(acc, calcTotalHappiness(names)),
	0,
);

console.log({result, result2});
