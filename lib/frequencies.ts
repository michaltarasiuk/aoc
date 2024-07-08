export function frequencies<T>(iterable: Iterable<T>) {
  const count = new Map<T, number>();

  for (const item of iterable) {
    count.set(item, (count.get(item) ?? 0) + 1);
  }
  return count;
}
