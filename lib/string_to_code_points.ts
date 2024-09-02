export function stringToCodePoints(
  string: string,
  fn = (codePoint: number) => codePoint
) {
  return Array.from(string, char => fn(char.codePointAt(0)!));
}
