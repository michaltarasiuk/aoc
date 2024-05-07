import {divisors} from '../lib/divisors';

const houses: Record<number, number> = {};

for (let i = 1; i <= 9; i++) {
	for (const j of divisors(i)) {
		houses[i] ??= 0;
		houses[i] += 10 * j;
	}
}

console.log(houses);
