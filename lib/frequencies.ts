export function frequencies<T>(items: Iterable<T>) {
  const count = new Map<T, number>();
  for (const item of items) {
    count.set(item, (count.get(item) ?? 0) + 1);
  }
  return count;
}
