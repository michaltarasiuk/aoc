export function matchInts(input: string) {
  const intsRe = /-?\d+/g;
  return Array.from(input.matchAll(intsRe), (m) => Number(m[0]));
}

export function matchUints(input: string) {
  const uintsRe = /\d+/g;
  return Array.from(input.matchAll(uintsRe), (m) => Number(m[0]));
}
