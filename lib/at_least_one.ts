export function atLeastOne<Item>(
	array: Array<Item>,
): asserts array is [Item, ...Item[]] {
	if (array.length === 0) {
		throw new Error("Array must have at least one item.");
	}
}
