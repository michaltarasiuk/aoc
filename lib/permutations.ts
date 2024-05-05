export function permutations<Item>(arr: Item[]): Item[][] {
	if (!arr.length) return [[]];

	return arr.flatMap((item, idx) => {
		return permutations([...arr.slice(0, idx), ...arr.slice(idx + 1)]).map(
			(items) => [item, ...items],
		);
	});
}
