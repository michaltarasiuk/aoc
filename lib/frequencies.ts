export function frequencies<T>(items: Iterable<T>) {
  const count = new Map<T, number>();
  for (const i of items) {
    count.set(i, (count.get(i) ?? 0) + 1);
  }
  return count;
}
