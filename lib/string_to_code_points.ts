export function stringToCodePoints(string: string) {
	return [...string].map((c) => c.codePointAt(0)!);
}
