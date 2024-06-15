export function create2dArr<T>(size: number, val: T) {
	return [...Array(size)].map(() => Array(size).fill(val));
}
