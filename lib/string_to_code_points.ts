export function stringToCodePoints(
  string: string,
  mapfn: (codePoint: number) => number = (codePoint) => codePoint,
) {
  return Array.from(string, (char) => mapfn(char.codePointAt(0)!));
}
