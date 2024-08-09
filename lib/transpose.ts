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
