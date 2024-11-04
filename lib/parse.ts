export function matchInts(input: string) {
  return input.match(/-?\d+/g)?.map(Number) ?? [];
}

export function matchUints(input: string) {
  return input.match(/\d+/g)?.map(Number) ?? [];
}
