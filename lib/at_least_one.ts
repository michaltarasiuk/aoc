export function atLeastOne<T>(arr: T[]): asserts arr is [T, ...T[]] {
  if (arr.length === 0) {
    throw new Error('Expected at least one item in the array');
  }
}
