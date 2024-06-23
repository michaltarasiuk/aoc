export function extractInts(input: string) {
	const numberRe = /-?\d+/g;
	return Array.from(input.matchAll(numberRe), Number);
}
