export function extractInts(input: string) {
  return input.match(/-?\d+/g)?.map(Number) ?? [];
}

export function extractUints(input: string) {
  return input.match(/\d+/g)?.map(Number) ?? [];
}
