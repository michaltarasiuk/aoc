export function extractInts(input: string) {
  const intsRe = /-?\d+/g;
  return Array.from(input.matchAll(intsRe), m => Number(m[0]));
}
