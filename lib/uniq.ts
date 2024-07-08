export function uniq<T>(iterable: Iterable<T>): T[] {
  return Array.from(new Set(iterable));
}
