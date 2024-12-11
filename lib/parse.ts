export function extractIntegers(s: string, {negative} = {negative: true}) {
  const re = new RegExp(String.raw`${negative ? '-?' : ''}\d+`, 'g');
  return s.match(re)?.map(Number) ?? [];
}
