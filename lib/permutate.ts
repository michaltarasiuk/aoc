export function permute<Item>(items: Item[]): Item[][] {
	if (!items.length) {
		return [[]];
	}
	const [first, ...rest] = items;
	return permute(rest).flatMap((items) => interleave(first!, items));
}

function interleave<Item>(item: Item, items: Item[]): Item[][] {
	if (!items.length) {
		return [[item]];
	}
	const [first, ...rest] = items;
	return [
		[item, first!, ...rest],
		...interleave(item, rest).map((items) => [first!, ...items]),
	];
}
