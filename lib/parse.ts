export function extractInts(s: string, {negative} = {negative: true}) {
  const intsRe = new RegExp((negative ? '-?' : '') + String.raw`\d+`, 'g');
  return s.matchAll(intsRe).map(Number).toArray();
}
