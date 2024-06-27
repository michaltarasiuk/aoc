import 'core-js/proposals/set-methods';

import {getInputLns} from 'lib/input';

declare global {
	interface Set<T> {
		intersection(other: Set<T>): Set<T>;
	}
}

const lns = await getInputLns({year: 2022, day: 3});

function splitRucksack(rucksack: string) {
	return [
		new Set(rucksack.slice(0, rucksack.length / 2)),
		new Set(rucksack.slice(rucksack.length / 2)),
	] as const;
}

function calcPriority(char: string) {
	const codePoint = char.codePointAt(0)!;

	if (char >= 'A' && char <= 'Z') {
		return codePoint - 'A'.charCodeAt(0) + 1;
	} else if (char >= 'a' && char <= 'z') {
		return codePoint - 'a'.charCodeAt(0) + 27;
	}
	throw new Error(`Invalid char: ${char}`);
}

const result = lns.reduce((acc, rucksack) => {
	const [a, b] = splitRucksack(rucksack);
	const [commonItemType] = Array.from(a.intersection(b));

	return acc + calcPriority(commonItemType);
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(8153);
	});
}
