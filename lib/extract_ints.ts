export function extractInts(s: string, {negative = true} = {}): number[] {
  const intsRe = new RegExp(`${negative ? '-?' : ''}\\d+`, 'g');
  return s.matchAll(intsRe).map(Number).toArray();
}
