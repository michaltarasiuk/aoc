export function castArray<T>(v: T | T[]) {
  return Array.isArray(v) ? v : [v];
}

export function* permute<T>(items: T[]): IteratorObject<T[]> {
  if (!items.length) {
    yield [];
    return;
  }
  const [first, ...rest] = items;
  for (const perm of permute(rest)) {
    yield* interleave(first!, perm);
  }
}
function* interleave<T>(item: T, items: T[]): IteratorObject<T[]> {
  if (!items.length) {
    yield [item];
    return;
  }
  const [first, ...rest] = items;
  yield [item, first, ...rest];
  for (const perm of interleave(item, rest)) {
    yield [first, ...perm];
  }
}

export function transpose<T>(matrix: T[][]) {
  const transposed: T[][] = [];

  for (const row of matrix) {
    for (const [i, item] of row.entries()) {
      transposed[i] ??= [];
      transposed[i].push(item);
    }
  }
  return transposed;
}
