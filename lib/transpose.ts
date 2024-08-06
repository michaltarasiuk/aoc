export function transpose<T>(matrix: T[][]) {
  return matrix.reduce<T[][]>((acc, row) => {
    row.forEach((item, i) => {
      acc[i] ??= [];
      acc[i].push(item);
    });
    return acc;
  }, []);
}
