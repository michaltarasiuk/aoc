import 'core-js/proposals/set-methods';

import {chunkEvery} from 'lib/chunk_every';
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

	if (char >= 'a' && char <= 'z') {
		return codePoint - 'a'.codePointAt(0)! + 1;
	} else if (char >= 'A' && char <= 'Z') {
		return codePoint - 'A'.codePointAt(0)! + 27;
	}
	throw new Error(`Invalid char: ${char}`);
}

const result = lns.reduce((acc, rucksack) => {
	const [a, b] = splitRucksack(rucksack);
	const [char] = a.intersection(b);

	return acc + calcPriority(char);
}, 0);

const result2 = chunkEvery(lns, 3).reduce((acc, [a, b, c]) => {
	const [char] = new Set(a).intersection(new Set(b)).intersection(new Set(c));
	return acc + calcPriority(char);
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(8153);
	});

	test('part 2', () => {
		expect(result2).toBe(2342);
	});
}
