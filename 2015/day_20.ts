import { divisors } from "lib/divisors";
import { getInput } from "lib/input";

const input = await getInput({
	year: 2015,
	day: 20,
});

const houses: { [k: number]: number } = {};
let i = 0;

loop: while (++i) {
	for (const j of divisors(i)) {
		const housePresentsCount = ((houses[i] ??= 0), (houses[i] += 10 * j));

		if (housePresentsCount >= Number(input)) {
			break loop;
		}
	}
}

console.log(i);
