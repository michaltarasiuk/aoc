export function extractInts(input: string) {
	const numberRe = /-?\d+/g;
	return Array.from(input.matchAll(numberRe), (m) => Number(m[0]));
}

export function extractUints(input: string) {
	const numberRe = /\d+/g;
	return Array.from(input.matchAll(numberRe), (m) => Number(m[0]));
}
