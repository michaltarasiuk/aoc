export function stringToCodePoints(string: string) {
	return Array.from(string, (char) => char.codePointAt(0)!);
}
