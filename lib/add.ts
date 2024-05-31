export function add(vals: (number | boolean)[]): number {
	// @ts-expect-error -- Non-string, non-BigInt values are coerced to numbers.
	return vals.reduce((a, b) => a + b, 0);
}
