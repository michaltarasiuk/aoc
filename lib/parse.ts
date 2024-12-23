export function extractIntegers(s: string, {negative} = {negative: true}) {
  const re = new RegExp((negative ? '-?' : '') + String.raw`\d+`, 'g');
  return s.matchAll(re).map(Number).toArray();
}
