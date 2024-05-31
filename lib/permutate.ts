export function permute<T>(items: T[]): T[][] {
	if (!items.length) {
		return [[]];
	}
	const [first, ...rest] = items;
	return permute(rest).flatMap((items) => interleave(first!, items));
}

function interleave<T>(item: T, items: T[]): T[][] {
	if (!items.length) {
		return [[item]];
	}
	const [first, ...rest] = items;
	return [
		[item, first, ...rest],
		...interleave(item, rest).map((items) => [first, ...items]),
	];
}
