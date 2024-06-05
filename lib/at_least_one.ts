export function atLeastOne<T>(items: T[]): asserts items is [T, ...T[]] {
	if (items.length === 0) {
		throw new Error('At least one item is required.');
	}
}
