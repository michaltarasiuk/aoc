export function withIndex<T>(iterable: Iterable<T>) {
	return Array.from(iterable, (value, index) => [value, index] as const);
}
