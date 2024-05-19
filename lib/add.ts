export function add(vals: (number | boolean)[]): number {
	// @ts-ignore -- Non-string, non-BigInt values are coerced to numbers.
	return vals.reduce((a, b) => a + b, 0);
}
