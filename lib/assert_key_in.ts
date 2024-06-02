export function assertKeyIn<T extends Record<string, unknown>>(
	object: T,
	key: PropertyKey,
): asserts key is keyof T {
	if (!(key in object)) {
		throw new Error(`Expected key "${key.toString()}" in object`);
	}
}
